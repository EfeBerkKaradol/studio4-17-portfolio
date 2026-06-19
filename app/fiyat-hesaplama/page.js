'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

const ModelViewer = dynamic(
  () => import('@/components/ModelViewer/ModelViewer'),
  { ssr: false }
);

const ACCEPTED_EXTENSIONS = ['stl', 'step', 'stp', 'obj', '3mf'];
const MAX_FILE_SIZE_MB = 100;
const MAX_FILES_PER_SESSION = 200;
const MAX_PART_SIZE_MM = 600;

const MATERIALS = [
  { id: 'pla', name: 'PLA', density: 1.24, pricePerGram: 0.80 },
  { id: 'abs', name: 'ABS', density: 1.04, pricePerGram: 0.90 },
  { id: 'petg', name: 'PETG', density: 1.27, pricePerGram: 1.00 },
  { id: 'tpu', name: 'TPU (Esnek)', density: 1.21, pricePerGram: 1.50 },
  { id: 'resin', name: 'Reçine (SLA)', density: 1.10, pricePerGram: 2.00 },
  { id: 'nylon', name: 'Naylon', density: 1.15, pricePerGram: 2.50 },
];

const QUALITIES = [
  { id: 'draft', name: 'Taslak', layer: 0.3, speedMul: 1.3, priceMul: 0.8 },
  { id: 'normal', name: 'Normal', layer: 0.2, speedMul: 1.0, priceMul: 1.0 },
  { id: 'fine', name: 'İnce', layer: 0.1, speedMul: 0.65, priceMul: 1.4 },
  { id: 'ultrafine', name: 'Ultra İnce', layer: 0.05, speedMul: 0.4, priceMul: 2.0 },
];

const COLORS = [
  { id: 'white', name: 'Beyaz', hex: '#f5f5f5' },
  { id: 'black', name: 'Siyah', hex: '#2a2a2a' },
  { id: 'gray', name: 'Gri', hex: '#9e9e9e' },
  { id: 'red', name: 'Kırmızı', hex: '#c0392b' },
  { id: 'blue', name: 'Mavi', hex: '#2980b9' },
  { id: 'green', name: 'Yeşil', hex: '#27ae60' },
  { id: 'orange', name: 'Turuncu', hex: '#e67e22' },
  { id: 'natural', name: 'Doğal', hex: '#d5c8b8' },
];

function parseSTLBinary(buffer) {
  const view = new DataView(buffer);
  const triangleCount = view.getUint32(80, true);
  let volume = 0;
  let surfaceArea = 0;
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (let i = 0; i < triangleCount; i++) {
    const offset = 84 + i * 50;
    const v1x = view.getFloat32(offset + 12, true);
    const v1y = view.getFloat32(offset + 16, true);
    const v1z = view.getFloat32(offset + 20, true);
    const v2x = view.getFloat32(offset + 24, true);
    const v2y = view.getFloat32(offset + 28, true);
    const v2z = view.getFloat32(offset + 32, true);
    const v3x = view.getFloat32(offset + 36, true);
    const v3y = view.getFloat32(offset + 40, true);
    const v3z = view.getFloat32(offset + 44, true);

    volume += (
      v1x * (v2y * v3z - v3y * v2z) -
      v2x * (v1y * v3z - v3y * v1z) +
      v3x * (v1y * v2z - v2y * v1z)
    ) / 6.0;

    const ax = v2x - v1x, ay = v2y - v1y, az = v2z - v1z;
    const bx = v3x - v1x, by = v3y - v1y, bz = v3z - v1z;
    const cx = ay * bz - az * by;
    const cy = az * bx - ax * bz;
    const cz = ax * by - ay * bx;
    surfaceArea += Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;

    for (const x of [v1x, v2x, v3x]) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
    for (const y of [v1y, v2y, v3y]) { minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
    for (const z of [v1z, v2z, v3z]) { minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z); }
  }

  return {
    volume: Math.abs(volume),
    surfaceArea,
    triangleCount,
    dimensions: { x: maxX - minX, y: maxY - minY, z: maxZ - minZ },
  };
}

function parseSTLAscii(text) {
  const vertexRegex = /vertex\s+([-\d.e+]+)\s+([-\d.e+]+)\s+([-\d.e+]+)/gi;
  const vertices = [];
  let match;
  while ((match = vertexRegex.exec(text)) !== null) {
    vertices.push([parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])]);
  }

  let volume = 0, surfaceArea = 0;
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  const triangleCount = Math.floor(vertices.length / 3);

  for (let i = 0; i < vertices.length; i += 3) {
    const [v1x, v1y, v1z] = vertices[i];
    const [v2x, v2y, v2z] = vertices[i + 1];
    const [v3x, v3y, v3z] = vertices[i + 2];

    volume += (
      v1x * (v2y * v3z - v3y * v2z) -
      v2x * (v1y * v3z - v3y * v1z) +
      v3x * (v1y * v2z - v2y * v1z)
    ) / 6.0;

    const ax = v2x - v1x, ay = v2y - v1y, az = v2z - v1z;
    const bx = v3x - v1x, by = v3y - v1y, bz = v3z - v1z;
    const cx = ay * bz - az * by;
    const cy = az * bx - ax * bz;
    const cz = ax * by - ay * bx;
    surfaceArea += Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;

    for (const x of [v1x, v2x, v3x]) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
    for (const y of [v1y, v2y, v3y]) { minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
    for (const z of [v1z, v2z, v3z]) { minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z); }
  }

  return {
    volume: Math.abs(volume),
    surfaceArea,
    triangleCount,
    dimensions: { x: maxX - minX, y: maxY - minY, z: maxZ - minZ },
  };
}

function parseSTL(buffer) {
  const decoder = new TextDecoder();
  const header = decoder.decode(new Uint8Array(buffer, 0, Math.min(80, buffer.byteLength)));
  if (header.startsWith('solid') && buffer.byteLength > 84) {
    const fullText = decoder.decode(buffer);
    if (fullText.includes('facet')) return parseSTLAscii(fullText);
  }
  return parseSTLBinary(buffer);
}

function parseOBJ(text) {
  const vertices = [];
  const faces = [];

  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('v ')) {
      const parts = trimmed.split(/\s+/);
      vertices.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
    } else if (trimmed.startsWith('f ')) {
      const parts = trimmed.split(/\s+/).slice(1);
      const indices = parts.map(p => parseInt(p.split('/')[0]) - 1);
      for (let i = 1; i < indices.length - 1; i++) {
        faces.push([indices[0], indices[i], indices[i + 1]]);
      }
    }
  }

  let volume = 0, surfaceArea = 0;
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (const v of vertices) {
    minX = Math.min(minX, v[0]); maxX = Math.max(maxX, v[0]);
    minY = Math.min(minY, v[1]); maxY = Math.max(maxY, v[1]);
    minZ = Math.min(minZ, v[2]); maxZ = Math.max(maxZ, v[2]);
  }

  for (const [i0, i1, i2] of faces) {
    const v1 = vertices[i0], v2 = vertices[i1], v3 = vertices[i2];
    if (!v1 || !v2 || !v3) continue;

    volume += (
      v1[0] * (v2[1] * v3[2] - v3[1] * v2[2]) -
      v2[0] * (v1[1] * v3[2] - v3[1] * v1[2]) +
      v3[0] * (v1[1] * v2[2] - v2[1] * v1[2])
    ) / 6.0;

    const ax = v2[0] - v1[0], ay = v2[1] - v1[1], az = v2[2] - v1[2];
    const bx = v3[0] - v1[0], by = v3[1] - v1[1], bz = v3[2] - v1[2];
    const cx = ay * bz - az * by, cy = az * bx - ax * bz, cz = ax * by - ay * bx;
    surfaceArea += Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;
  }

  return {
    volume: Math.abs(volume),
    surfaceArea,
    triangleCount: faces.length,
    dimensions: {
      x: maxX === -Infinity ? 0 : maxX - minX,
      y: maxY === -Infinity ? 0 : maxY - minY,
      z: maxZ === -Infinity ? 0 : maxZ - minZ,
    },
  };
}

async function parse3MF(buffer) {
  const files = {};
  const view = new DataView(buffer);
  let offset = 0;

  while (offset < buffer.byteLength - 4) {
    const sig = view.getUint32(offset, true);
    if (sig !== 0x04034b50) break;

    const compMethod = view.getUint16(offset + 8, true);
    const compSize = view.getUint32(offset + 18, true);
    const uncompSize = view.getUint32(offset + 22, true);
    const nameLen = view.getUint16(offset + 26, true);
    const extraLen = view.getUint16(offset + 28, true);
    const name = new TextDecoder().decode(new Uint8Array(buffer, offset + 30, nameLen));
    const dataStart = offset + 30 + nameLen + extraLen;
    const rawData = new Uint8Array(buffer, dataStart, compSize);

    if (compMethod === 0) {
      files[name] = rawData;
    } else if (compMethod === 8 && typeof DecompressionStream !== 'undefined') {
      try {
        const ds = new DecompressionStream('deflate-raw');
        const writer = ds.writable.getWriter();
        writer.write(rawData);
        writer.close();
        const reader = ds.readable.getReader();
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        const total = chunks.reduce((a, c) => a + c.length, 0);
        const result = new Uint8Array(total);
        let pos = 0;
        for (const chunk of chunks) { result.set(chunk, pos); pos += chunk.length; }
        files[name] = result;
      } catch {
        files[name] = rawData;
      }
    } else {
      files[name] = rawData;
    }

    offset = dataStart + compSize;
  }

  const modelFile = Object.keys(files).find(k => k.endsWith('.model') || k.includes('3dmodel'));
  if (!modelFile) return null;

  const xmlText = new TextDecoder().decode(files[modelFile]);
  const vertexMatches = [...xmlText.matchAll(/<vertex\s+x="([^"]+)"\s+y="([^"]+)"\s+z="([^"]+)"/g)];
  const triangleMatches = [...xmlText.matchAll(/<triangle\s+v1="([^"]+)"\s+v2="([^"]+)"\s+v3="([^"]+)"/g)];

  const vertices = vertexMatches.map(m => [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]);

  let volume = 0, surfaceArea = 0;
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (const v of vertices) {
    minX = Math.min(minX, v[0]); maxX = Math.max(maxX, v[0]);
    minY = Math.min(minY, v[1]); maxY = Math.max(maxY, v[1]);
    minZ = Math.min(minZ, v[2]); maxZ = Math.max(maxZ, v[2]);
  }

  for (const m of triangleMatches) {
    const v1 = vertices[parseInt(m[1])];
    const v2 = vertices[parseInt(m[2])];
    const v3 = vertices[parseInt(m[3])];
    if (!v1 || !v2 || !v3) continue;

    volume += (
      v1[0] * (v2[1] * v3[2] - v3[1] * v2[2]) -
      v2[0] * (v1[1] * v3[2] - v3[1] * v1[2]) +
      v3[0] * (v1[1] * v2[2] - v2[1] * v1[2])
    ) / 6.0;

    const ax = v2[0] - v1[0], ay = v2[1] - v1[1], az = v2[2] - v1[2];
    const bx = v3[0] - v1[0], by = v3[1] - v1[1], bz = v3[2] - v1[2];
    const cx = ay * bz - az * by, cy = az * bx - ax * bz, cz = ax * by - ay * bx;
    surfaceArea += Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;
  }

  return {
    volume: Math.abs(volume),
    surfaceArea,
    triangleCount: triangleMatches.length,
    dimensions: {
      x: maxX === -Infinity ? 0 : maxX - minX,
      y: maxY === -Infinity ? 0 : maxY - minY,
      z: maxZ === -Infinity ? 0 : maxZ - minZ,
    },
    vertices,
    triangleMatches,
  };
}

function sliceModel(modelData, material, quality, infillPercent) {
  const { volume, surfaceArea, dimensions } = modelData;
  const mat = MATERIALS.find(m => m.id === material);
  const qual = QUALITIES.find(q => q.id === quality);

  const volumeCm3 = volume / 1000;
  const surfaceAreaCm2 = surfaceArea / 100;
  const heightMm = dimensions.z;

  const layerCount = Math.ceil(heightMm / qual.layer);

  const wallThickness = 1.2;
  const wallLineCount = Math.round(wallThickness / 0.4);
  const topBottomLayers = Math.round(1.2 / qual.layer);
  const topBottomVolume = surfaceAreaCm2 * 0.1 * (topBottomLayers * qual.layer / 10) * 2;

  const avgPerimeterMm = ((dimensions.x + dimensions.y) * 2) * 0.6;
  const wallLength = avgPerimeterMm * wallLineCount * layerCount;
  const wallVolumeMm3 = wallLength * 0.4 * qual.layer;
  const wallVolumeCm3 = wallVolumeMm3 / 1000;

  const innerVolume = Math.max(0, volumeCm3 - wallVolumeCm3 - topBottomVolume);
  const infillVolumeCm3 = innerVolume * (infillPercent / 100);

  const totalVolumeCm3 = wallVolumeCm3 + infillVolumeCm3 + topBottomVolume;

  const weightGrams = totalVolumeCm3 * mat.density;
  const filamentLengthM = (totalVolumeCm3 * 1000) / (Math.PI * (0.875) * (0.875));

  const printSpeedMmS = 60 * qual.speedMul;
  const travelSpeedMmS = 150;

  const wallTimeSec = wallLength / printSpeedMmS;
  const infillSpeedMmS = printSpeedMmS * 1.3;
  const infillLineLengthMm = infillVolumeCm3 * 1000 / (0.4 * qual.layer);
  const infillTimeSec = infillLineLengthMm / infillSpeedMmS;

  const topBottomTimeSec = (topBottomVolume * 1000 / (0.4 * qual.layer)) / printSpeedMmS;

  const travelDistPerLayer = (dimensions.x + dimensions.y) * 0.3;
  const travelTimeSec = (travelDistPerLayer * layerCount) / travelSpeedMmS;

  const layerChangeTimeSec = layerCount * 1.5;

  const totalPrintTimeSec = wallTimeSec + infillTimeSec + topBottomTimeSec + travelTimeSec + layerChangeTimeSec;
  const totalPrintTimeMin = totalPrintTimeSec / 60;

  const materialCost = weightGrams * mat.pricePerGram;
  const timeCostPerMin = 0.15;
  const machineCost = totalPrintTimeMin * timeCostPerMin;
  const setupFee = 15;
  const qualityMultiplier = qual.priceMul;

  const totalCost = (materialCost + machineCost) * qualityMultiplier + setupFee;

  return {
    layerCount,
    wallVolumeCm3,
    infillVolumeCm3,
    topBottomVolume,
    totalVolumeCm3,
    weightGrams,
    filamentLengthM,
    totalPrintTimeMin,
    materialCost,
    machineCost,
    setupFee,
    totalCost,
    breakdown: {
      wallTime: wallTimeSec / 60,
      infillTime: infillTimeSec / 60,
      topBottomTime: topBottomTimeSec / 60,
      travelTime: travelTimeSec / 60,
    }
  };
}

export default function PriceCalculatorPage() {
  const [files, setFiles] = useState([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [material, setMaterial] = useState('pla');
  const [quality, setQuality] = useState('normal');
  const [infill, setInfill] = useState(20);
  const [color, setColor] = useState('white');
  const [quantity, setQuantity] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState([]);
  const [threeGeometry, setThreeGeometry] = useState(null);
  const fileInputRef = useRef(null);

  const activeFile = files[activeFileIndex];

  const processFile = useCallback(async (f) => {
    const ext = f.name.toLowerCase().split('.').pop();

    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      setErrors(prev => [...prev, `${f.name}: Desteklenmeyen format. Desteklenen: ${ACCEPTED_EXTENSIONS.map(e => `.${e}`).join(', ')}`]);
      return;
    }

    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors(prev => [...prev, `${f.name}: Dosya boyutu ${MAX_FILE_SIZE_MB}MB sınırını aşıyor.`]);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        let modelData = null;
        let geometry = null;

        if (ext === 'stl') {
          modelData = parseSTL(e.target.result);

          const { x, y, z } = modelData.dimensions;
          if (x > MAX_PART_SIZE_MM || y > MAX_PART_SIZE_MM || z > MAX_PART_SIZE_MM) {
            setErrors(prev => [...prev, `${f.name}: Parça boyutu ${MAX_PART_SIZE_MM}×${MAX_PART_SIZE_MM}×${MAX_PART_SIZE_MM}mm sınırını aşıyor (${x.toFixed(0)}×${y.toFixed(0)}×${z.toFixed(0)}mm).`]);
            return;
          }

          try {
            const THREE = await import('three');
            const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
            const loader = new STLLoader();
            geometry = loader.parse(e.target.result);
          } catch { /* viewer unavailable */ }
        } else if (ext === 'obj') {
          const text = new TextDecoder().decode(new Uint8Array(e.target.result));
          modelData = parseOBJ(text);

          const { x, y, z } = modelData.dimensions;
          if (x > MAX_PART_SIZE_MM || y > MAX_PART_SIZE_MM || z > MAX_PART_SIZE_MM) {
            setErrors(prev => [...prev, `${f.name}: Parça boyutu ${MAX_PART_SIZE_MM}×${MAX_PART_SIZE_MM}×${MAX_PART_SIZE_MM}mm sınırını aşıyor (${x.toFixed(0)}×${y.toFixed(0)}×${z.toFixed(0)}mm).`]);
            return;
          }

          try {
            const THREE = await import('three');
            const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
            const { mergeGeometries } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
            const loader = new OBJLoader();
            const group = loader.parse(text);
            const geometries = [];
            group.traverse((child) => {
              if (child.isMesh && child.geometry) {
                child.updateMatrixWorld(true);
                const cloned = child.geometry.clone();
                cloned.applyMatrix4(child.matrixWorld);
                geometries.push(cloned);
              }
            });
            if (geometries.length > 0) {
              geometry = mergeGeometries(geometries, false) || geometries[0];
            }
          } catch { /* viewer unavailable */ }

        } else if (ext === '3mf') {
          try {
            modelData = await parse3MF(e.target.result);
            if (!modelData) {
              setErrors(prev => [...prev, `${f.name}: 3MF dosyası okunamadı veya mesh verisi bulunamadı.`]);
              return;
            }

            const { x, y, z } = modelData.dimensions;
            if (x > MAX_PART_SIZE_MM || y > MAX_PART_SIZE_MM || z > MAX_PART_SIZE_MM) {
              setErrors(prev => [...prev, `${f.name}: Parça boyutu ${MAX_PART_SIZE_MM}×${MAX_PART_SIZE_MM}×${MAX_PART_SIZE_MM}mm sınırını aşıyor (${x.toFixed(0)}×${y.toFixed(0)}×${z.toFixed(0)}mm).`]);
              return;
            }

            try {
              const THREE = await import('three');
              const positions = [];
              const verts = modelData.vertices;
              for (const m of modelData.triangleMatches) {
                const v1 = verts[parseInt(m[1])], v2 = verts[parseInt(m[2])], v3 = verts[parseInt(m[3])];
                if (v1 && v2 && v3) { positions.push(...v1, ...v2, ...v3); }
              }
              if (positions.length > 0) {
                const geo = new THREE.BufferGeometry();
                geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
                geo.computeVertexNormals();
                geometry = geo;
              }
            } catch { /* viewer unavailable */ }
          } catch {
            setErrors(prev => [...prev, `${f.name}: 3MF dosyası işlenirken hata oluştu.`]);
            return;
          }

        } else if (ext === 'step' || ext === 'stp') {
          modelData = {
            volume: 0, surfaceArea: 0, triangleCount: 0,
            dimensions: { x: 0, y: 0, z: 0 },
          };
          setErrors(prev => [...prev, `${f.name}: STEP/STP dosyaları yüklendi ancak tarayıcıda tam analiz yapılamıyor. Fiyat tahmini için lütfen dosyanızı STL formatına dönüştürün.`]);
        }

        const newFile = { file: f, modelData, geometry, name: f.name, size: f.size };

        setFiles(prev => {
          if (prev.length >= MAX_FILES_PER_SESSION) {
            setErrors(e => [...e, `Oturum başına en fazla ${MAX_FILES_PER_SESSION} dosya yüklenebilir.`]);
            return prev;
          }
          const updated = [...prev, newFile];
          setActiveFileIndex(updated.length - 1);
          return updated;
        });

        if (geometry) setThreeGeometry(geometry);
      } catch {
        setErrors(prev => [...prev, `${f.name}: Dosya okunamadı.`]);
      }
    };
    reader.readAsArrayBuffer(f);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    setErrors([]);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(processFile);
  }, [processFile]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);
  const handleFileChange = useCallback((e) => {
    setErrors([]);
    Array.from(e.target.files).forEach(processFile);
    e.target.value = '';
  }, [processFile]);

  const removeFile = useCallback((index) => {
    setFiles(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (activeFileIndex >= updated.length) setActiveFileIndex(Math.max(0, updated.length - 1));
      if (updated.length === 0) setThreeGeometry(null);
      return updated;
    });
  }, [activeFileIndex]);

  const selectFile = useCallback((index) => {
    setActiveFileIndex(index);
    const f = files[index];
    if (f?.geometry) setThreeGeometry(f.geometry);
    else setThreeGeometry(null);
  }, [files]);

  const slicerResult = useMemo(() => {
    if (!activeFile?.modelData || activeFile.modelData.volume === 0) return null;
    return sliceModel(activeFile.modelData, material, quality, infill);
  }, [activeFile, material, quality, infill]);

  const unitPrice = slicerResult ? slicerResult.totalCost : 0;
  const totalPrice = unitPrice * quantity;
  const selectedMaterial = MATERIALS.find(m => m.id === material);
  const selectedQuality = QUALITIES.find(q => q.id === quality);

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    if (h > 0) return `${h} sa ${m} dk`;
    return `${m} dk`;
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.subtitle}>3D BASKI</span>
            <h1 className="font-serif">Fiyat Hesaplama</h1>
            <p className={styles.heroDesc}>
              3D model dosyanızı yükleyin, malzeme ve kalite seçeneklerini belirleyin — slicer tabanlı fiyatlandırma ile anında teklif alın.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className={styles.calculatorLayout}>

              {/* Üst — 3D Viewer + Upload */}
              <div className={styles.topSection}>
                <div className={styles.viewerColumn}>
                  <ModelViewer geometry={threeGeometry} fileName={activeFile?.name} />
                </div>

                <div className={styles.uploadColumn}>
                  <div
                    className={`${styles.uploadArea} ${isDragging ? styles.uploadDragging : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ACCEPTED_EXTENSIONS.map(e => `.${e}`).join(',')}
                      onChange={handleFileChange}
                      className={styles.fileInput}
                      multiple
                    />
                    <div className={styles.uploadIcon}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </div>
                    <p className={styles.uploadTitle}>Dosya yükleyin</p>
                    <p className={styles.uploadFormats}>Sürükle & bırak veya tıklayın</p>
                  </div>

                  <div className={styles.constraints}>
                    <div className={styles.constraintItem}>
                      <span className={styles.constraintLabel}>Desteklenen formatlar</span>
                      <span className={styles.constraintValue}>.stl .step .stp .obj .3mf</span>
                    </div>
                    <div className={styles.constraintItem}>
                      <span className={styles.constraintLabel}>Maks. dosya boyutu</span>
                      <span className={styles.constraintValue}>{MAX_FILE_SIZE_MB} MB</span>
                    </div>
                    <div className={styles.constraintItem}>
                      <span className={styles.constraintLabel}>Oturum başına maks. dosya</span>
                      <span className={styles.constraintValue}>{MAX_FILES_PER_SESSION}</span>
                    </div>
                    <div className={styles.constraintItem}>
                      <span className={styles.constraintLabel}>Maks. parça boyutu</span>
                      <span className={styles.constraintValue}>{MAX_PART_SIZE_MM} × {MAX_PART_SIZE_MM} × {MAX_PART_SIZE_MM} mm</span>
                    </div>
                  </div>

                  {/* Yüklenen dosyalar listesi */}
                  {files.length > 0 && (
                    <div className={styles.fileList}>
                      <h4>Yüklenen Dosyalar ({files.length})</h4>
                      {files.map((f, i) => (
                        <div
                          key={i}
                          className={`${styles.fileItem} ${i === activeFileIndex ? styles.fileItemActive : ''}`}
                          onClick={() => selectFile(i)}
                        >
                          <div className={styles.fileItemInfo}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                            <div>
                              <span className={styles.fileItemName}>{f.name}</span>
                              <span className={styles.fileItemSize}>{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                          </div>
                          <button className={styles.fileRemove} onClick={(e) => { e.stopPropagation(); removeFile(i); }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {errors.length > 0 && (
                <div className={styles.errorList}>
                  {errors.map((err, i) => (
                    <p key={i} className={styles.error}>{err}</p>
                  ))}
                  <button className={styles.clearErrors} onClick={() => setErrors([])}>Uyarıları Temizle</button>
                </div>
              )}

              {/* Alt — Ayarlar + Fiyat */}
              <div className={styles.bottomSection}>
                <div className={styles.settingsPanel}>
                  {/* Model Bilgileri */}
                  {activeFile?.modelData && activeFile.modelData.volume > 0 && (
                    <div className={styles.fileDetails}>
                      <h3>Slicer Analizi</h3>
                      <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Boyut</span>
                          <span className={styles.detailValue}>{activeFile.modelData.dimensions.x.toFixed(1)} × {activeFile.modelData.dimensions.y.toFixed(1)} × {activeFile.modelData.dimensions.z.toFixed(1)} mm</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Hacim</span>
                          <span className={styles.detailValue}>{(activeFile.modelData.volume / 1000).toFixed(2)} cm³</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Yüzey Alanı</span>
                          <span className={styles.detailValue}>{(activeFile.modelData.surfaceArea / 100).toFixed(1)} cm²</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Üçgen</span>
                          <span className={styles.detailValue}>{activeFile.modelData.triangleCount.toLocaleString('tr-TR')}</span>
                        </div>
                        {slicerResult && (
                          <>
                            <div className={styles.detailItem}>
                              <span className={styles.detailLabel}>Katman Sayısı</span>
                              <span className={styles.detailValue}>{slicerResult.layerCount.toLocaleString('tr-TR')}</span>
                            </div>
                            <div className={styles.detailItem}>
                              <span className={styles.detailLabel}>Filament</span>
                              <span className={styles.detailValue}>{slicerResult.filamentLengthM.toFixed(2)} m / {slicerResult.weightGrams.toFixed(1)} g</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Malzeme */}
                  <div className={styles.optionGroup}>
                    <h3>Malzeme</h3>
                    <div className={styles.materialGrid}>
                      {MATERIALS.map(m => (
                        <button
                          key={m.id}
                          className={`${styles.materialCard} ${material === m.id ? styles.materialActive : ''}`}
                          onClick={() => setMaterial(m.id)}
                        >
                          <span className={styles.materialName}>{m.name}</span>
                          <span className={styles.materialPrice}>₺{m.pricePerGram.toFixed(2)}/g</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kalite */}
                  <div className={styles.optionGroup}>
                    <h3>Baskı Kalitesi (Katman Yüksekliği)</h3>
                    <div className={styles.qualityGrid}>
                      {QUALITIES.map(q => (
                        <button
                          key={q.id}
                          className={`${styles.qualityCard} ${quality === q.id ? styles.qualityActive : ''}`}
                          onClick={() => setQuality(q.id)}
                        >
                          <span className={styles.qualityName}>{q.name}</span>
                          <span className={styles.qualityLayer}>{q.layer} mm</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Renk */}
                  <div className={styles.optionGroup}>
                    <h3>Renk</h3>
                    <div className={styles.colorGrid}>
                      {COLORS.map(c => (
                        <button
                          key={c.id}
                          className={`${styles.colorSwatch} ${color === c.id ? styles.colorActive : ''}`}
                          onClick={() => setColor(c.id)}
                          title={c.name}
                        >
                          <span className={styles.colorCircle} style={{ backgroundColor: c.hex }}></span>
                          <span className={styles.colorName}>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dolgu + Adet */}
                  <div className={styles.optionRow}>
                    <div className={styles.optionGroup} style={{ flex: 1 }}>
                      <div className={styles.sliderHeader}>
                        <h3>Dolgu Oranı</h3>
                        <span className={styles.sliderValue}>%{infill}</span>
                      </div>
                      <input
                        type="range" min="5" max="100" step="5"
                        value={infill}
                        onChange={(e) => setInfill(Number(e.target.value))}
                        className={styles.slider}
                      />
                      <div className={styles.sliderLabels}>
                        <span>Hafif</span>
                        <span>Sağlam</span>
                      </div>
                    </div>
                    <div className={styles.optionGroup}>
                      <h3>Adet</h3>
                      <div className={styles.quantityControl}>
                        <button className={styles.quantityBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                        <span className={styles.quantityValue}>{quantity}</span>
                        <button className={styles.quantityBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fiyat */}
                <div className={styles.pricePanel}>
                  <div className={styles.priceStickyWrapper}>
                    <div className={styles.priceCard}>
                      <h2 className="font-serif">Fiyat Özeti</h2>

                      {slicerResult ? (
                        <>
                          <div className={styles.priceBreakdown}>
                            <div className={styles.priceRow}>
                              <span>Malzeme maliyeti</span>
                              <span>₺{slicerResult.materialCost.toFixed(2)}</span>
                            </div>
                            <div className={styles.priceRow}>
                              <span>Makine süresi ({formatTime(slicerResult.totalPrintTimeMin)})</span>
                              <span>₺{slicerResult.machineCost.toFixed(2)}</span>
                            </div>
                            <div className={styles.priceRow}>
                              <span>Kalite çarpanı ({selectedQuality?.name})</span>
                              <span>×{selectedQuality?.priceMul.toFixed(1)}</span>
                            </div>
                            <div className={styles.priceRow}>
                              <span>Hazırlık ücreti</span>
                              <span>₺{slicerResult.setupFee.toFixed(2)}</span>
                            </div>

                            <div className={styles.priceDivider}></div>

                            <div className={styles.priceRow}>
                              <span>Birim fiyat</span>
                              <span>₺{unitPrice.toFixed(2)}</span>
                            </div>
                            {quantity > 1 && (
                              <div className={styles.priceRow}>
                                <span>Adet</span>
                                <span>×{quantity}</span>
                              </div>
                            )}

                            <div className={styles.priceDivider}></div>

                            <div className={`${styles.priceRow} ${styles.priceTotal}`}>
                              <span>Toplam</span>
                              <span>₺{totalPrice.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className={styles.timeBreakdown}>
                            <h4>Süre Dağılımı</h4>
                            <div className={styles.timeBar}>
                              <div className={styles.timeSegment} style={{ flex: slicerResult.breakdown.wallTime, backgroundColor: 'var(--color-accent)' }} title={`Duvar: ${formatTime(slicerResult.breakdown.wallTime)}`}></div>
                              <div className={styles.timeSegment} style={{ flex: slicerResult.breakdown.infillTime, backgroundColor: 'var(--color-cream-dark)' }} title={`Dolgu: ${formatTime(slicerResult.breakdown.infillTime)}`}></div>
                              <div className={styles.timeSegment} style={{ flex: slicerResult.breakdown.topBottomTime, backgroundColor: '#c4a47c80' }} title={`Üst/Alt: ${formatTime(slicerResult.breakdown.topBottomTime)}`}></div>
                              <div className={styles.timeSegment} style={{ flex: slicerResult.breakdown.travelTime, backgroundColor: 'var(--color-cream-soft)' }} title={`Hareket: ${formatTime(slicerResult.breakdown.travelTime)}`}></div>
                            </div>
                            <div className={styles.timeLegend}>
                              <span><i style={{ backgroundColor: 'var(--color-accent)' }}></i>Duvar</span>
                              <span><i style={{ backgroundColor: 'var(--color-cream-dark)' }}></i>Dolgu</span>
                              <span><i style={{ backgroundColor: '#c4a47c80' }}></i>Üst/Alt</span>
                              <span><i style={{ backgroundColor: 'var(--color-cream-soft)' }}></i>Hareket</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className={styles.priceEmpty}>
                          <p>Fiyat hesaplaması için bir STL dosyası yükleyin.</p>
                        </div>
                      )}

                      <p className={styles.priceNote}>
                        * Slicer tabanlı tahmindir. Destek yapıları ve karmaşık geometriler fiyatı değiştirebilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
