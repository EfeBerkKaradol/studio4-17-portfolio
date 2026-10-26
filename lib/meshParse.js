// Tarayıcıda STL / OBJ / 3MF okuyup hacim, yüzey alanı ve boyut hesaplar.
// Dosya sunucuya gönderilmez. Hacim, kapalı (su geçirmez) bir mesh varsayar.

function measure(triangles) {
  let volume = 0;
  let surfaceArea = 0;
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  let count = 0;

  for (const [a, b, c] of triangles) {
    volume += (a[0] * (b[1] * c[2] - c[1] * b[2]) - b[0] * (a[1] * c[2] - c[1] * a[2]) + c[0] * (a[1] * b[2] - b[1] * a[2])) / 6;
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    surfaceArea += Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;
    for (const p of [a, b, c]) {
      if (p[0] < minX) minX = p[0];
      if (p[0] > maxX) maxX = p[0];
      if (p[1] < minY) minY = p[1];
      if (p[1] > maxY) maxY = p[1];
      if (p[2] < minZ) minZ = p[2];
      if (p[2] > maxZ) maxZ = p[2];
    }
    count++;
  }

  if (!count) return null;
  return {
    volume: Math.abs(volume),
    signedVolume: volume,
    surfaceArea,
    triangleCount: count,
    dimensions: { x: maxX - minX, y: maxY - minY, z: maxZ - minZ },
  };
}

function* stlBinaryTriangles(view) {
  const n = view.getUint32(80, true);
  if (84 + n * 50 > view.byteLength) throw new Error('STL dosyası eksik veya bozuk.');
  for (let i = 0; i < n; i++) {
    const o = 84 + i * 50 + 12;
    const v = (k) => [view.getFloat32(o + k, true), view.getFloat32(o + k + 4, true), view.getFloat32(o + k + 8, true)];
    yield [v(0), v(12), v(24)];
  }
}

function* stlAsciiTriangles(text) {
  const re = /vertex\s+(\S+)\s+(\S+)\s+(\S+)/gi;
  let m;
  let tri = [];
  while ((m = re.exec(text)) !== null) {
    tri.push([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]);
    if (tri.length === 3) {
      yield tri;
      tri = [];
    }
  }
}

export function parseSTL(buffer) {
  const head = new TextDecoder().decode(new Uint8Array(buffer, 0, Math.min(512, buffer.byteLength)));
  const view = new DataView(buffer);
  const binarySizeMatches = buffer.byteLength >= 84 && 84 + view.getUint32(80, true) * 50 === buffer.byteLength;
  if (head.trimStart().startsWith('solid') && !binarySizeMatches) {
    return measure(stlAsciiTriangles(new TextDecoder().decode(buffer)));
  }
  return measure(stlBinaryTriangles(view));
}

function* indexedTriangles(vertices, faces) {
  for (const [i, j, k] of faces) {
    const a = vertices[i], b = vertices[j], c = vertices[k];
    if (a && b && c) yield [a, b, c];
  }
}

export function parseOBJ(text) {
  const vertices = [];
  const faces = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (t.startsWith('v ')) {
      const p = t.split(/\s+/);
      vertices.push([parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3])]);
    } else if (t.startsWith('f ')) {
      const idx = t
        .split(/\s+/)
        .slice(1)
        .map((s) => {
          const n = parseInt(s.split('/')[0], 10);
          return n < 0 ? vertices.length + n : n - 1;
        });
      for (let i = 1; i < idx.length - 1; i++) faces.push([idx[0], idx[i], idx[i + 1]]);
    }
  }
  return measure(indexedTriangles(vertices, faces));
}

async function inflateRaw(data) {
  const ds = new DecompressionStream('deflate-raw');
  const stream = new Blob([data]).stream().pipeThrough(ds);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

// 3MF bir ZIP arşividir; içindeki 3D/3dmodel.model XML'i okunur.
export async function parse3MF(buffer) {
  const view = new DataView(buffer);
  let offset = 0;
  let xml = null;
  while (offset < buffer.byteLength - 30 && view.getUint32(offset, true) === 0x04034b50) {
    const method = view.getUint16(offset + 8, true);
    const compSize = view.getUint32(offset + 18, true);
    const nameLen = view.getUint16(offset + 26, true);
    const extraLen = view.getUint16(offset + 28, true);
    const name = new TextDecoder().decode(new Uint8Array(buffer, offset + 30, nameLen));
    const start = offset + 30 + nameLen + extraLen;
    if (name.toLowerCase().endsWith('.model')) {
      const raw = new Uint8Array(buffer, start, compSize);
      const bytes = method === 0 ? raw : method === 8 ? await inflateRaw(raw) : null;
      if (!bytes) throw new Error('3MF sıkıştırma biçimi desteklenmiyor.');
      xml = new TextDecoder().decode(bytes);
      break;
    }
    if (compSize === 0) throw new Error('3MF dosyası okunamadı.');
    offset = start + compSize;
  }
  if (!xml) throw new Error('3MF içinde model verisi bulunamadı.');

  const vertices = [...xml.matchAll(/<vertex\s+x="([^"]+)"\s+y="([^"]+)"\s+z="([^"]+)"/g)].map((m) => [
    parseFloat(m[1]),
    parseFloat(m[2]),
    parseFloat(m[3]),
  ]);
  const faces = [...xml.matchAll(/<triangle\s+v1="(\d+)"\s+v2="(\d+)"\s+v3="(\d+)"/g)].map((m) => [+m[1], +m[2], +m[3]]);
  const result = measure(indexedTriangles(vertices, faces));
  if (result) result.mesh = { vertices, faces };
  return result;
}
