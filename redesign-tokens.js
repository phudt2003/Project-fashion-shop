#!/usr/bin/env node

/**
 * ============================================================
 *  STITCH – Design Token Migrator
 *  Shop quần áo trẻ em | Tailwind CSS | React / Next.js
 *
 *  Chạy:  node redesign-tokens.js [--dir=./src] [--dry-run]
 *
 *  --dir      Thư mục gốc cần quét (mặc định: ./src)
 *  --dry-run  Chỉ in ra những gì sẽ đổi, không ghi file
 * ============================================================
 */

const fs   = require("fs");
const path = require("path");

// ─── CLI args ────────────────────────────────────────────────
const args   = process.argv.slice(2);
const DRY    = args.includes("--dry-run");
const dirArg = args.find(a => a.startsWith("--dir="));
const ROOT   = dirArg ? dirArg.split("=")[1] : "./src";

// ─── Extensions cần quét ────────────────────────────────────
const EXTS = [".jsx", ".tsx", ".js", ".ts", ".html", ".css"];

// ════════════════════════════════════════════════════════════
//  BẢNG THAY THẾ – chỉnh tại đây nếu muốn tuỳ biến
// ════════════════════════════════════════════════════════════

/**
 * MÀU SẮC
 * Tông Neutral cream/trắng/xám cho shop trẻ em:
 *   primary   → rose-300   (hồng nhạt accent duy nhất)
 *   bg        → stone-50   (kem trắng)
 *   surface   → white
 *   border    → stone-200
 *   text dark → stone-800
 *   text mid  → stone-500
 *   text light→ stone-400
 *
 * Quy tắc: key = class Tailwind CŨ, value = class Tailwind MỚI
 */
const COLOR_MAP = {
  // === Backgrounds ===
  "bg-blue-500"   : "bg-rose-300",
  "bg-blue-600"   : "bg-rose-400",
  "bg-blue-400"   : "bg-rose-200",
  "bg-indigo-500" : "bg-rose-300",
  "bg-indigo-600" : "bg-rose-400",
  "bg-purple-500" : "bg-rose-300",
  "bg-purple-600" : "bg-rose-400",
  "bg-green-500"  : "bg-emerald-300",
  "bg-green-600"  : "bg-emerald-400",
  "bg-yellow-400" : "bg-amber-200",
  "bg-yellow-500" : "bg-amber-300",
  "bg-red-500"    : "bg-rose-400",
  "bg-red-600"    : "bg-rose-500",
  "bg-gray-100"   : "bg-stone-50",
  "bg-gray-200"   : "bg-stone-100",
  "bg-gray-800"   : "bg-stone-800",
  "bg-gray-900"   : "bg-stone-900",
  "bg-white"      : "bg-white",        // giữ nguyên

  // === Text colours ===
  "text-blue-500"   : "text-rose-400",
  "text-blue-600"   : "text-rose-500",
  "text-indigo-500" : "text-rose-400",
  "text-indigo-600" : "text-rose-500",
  "text-purple-500" : "text-rose-400",
  "text-purple-600" : "text-rose-500",
  "text-green-500"  : "text-emerald-500",
  "text-green-600"  : "text-emerald-600",
  "text-yellow-500" : "text-amber-500",
  "text-red-500"    : "text-rose-500",
  "text-gray-700"   : "text-stone-700",
  "text-gray-800"   : "text-stone-800",
  "text-gray-900"   : "text-stone-900",
  "text-gray-500"   : "text-stone-500",
  "text-gray-400"   : "text-stone-400",
  "text-gray-600"   : "text-stone-600",

  // === Borders ===
  "border-blue-500"   : "border-rose-300",
  "border-blue-600"   : "border-rose-400",
  "border-indigo-500" : "border-rose-300",
  "border-gray-300"   : "border-stone-200",
  "border-gray-400"   : "border-stone-300",
  "border-gray-200"   : "border-stone-200",

  // === Ring / focus ===
  "ring-blue-500"    : "ring-rose-300",
  "ring-indigo-500"  : "ring-rose-300",
  "focus:ring-blue-500"   : "focus:ring-rose-300",
  "focus:ring-indigo-500" : "focus:ring-rose-300",

  // === Hover ===
  "hover:bg-blue-600"   : "hover:bg-rose-400",
  "hover:bg-blue-700"   : "hover:bg-rose-500",
  "hover:bg-indigo-600" : "hover:bg-rose-400",
  "hover:bg-gray-100"   : "hover:bg-stone-100",
  "hover:text-blue-600" : "hover:text-rose-500",

  // === Divide ===
  "divide-gray-200" : "divide-stone-200",
  "divide-gray-300" : "divide-stone-200",
};

/**
 * FONT FAMILY
 */
const FONT_MAP = {
  "font-mono"   : "font-sans",
  "font-serif"  : "font-sans",
  // Nếu bạn muốn đổi sang Google Font cụ thể, thêm vào tailwind.config.js
  // Script này đổi class utility, không cần làm gì thêm ở đây
};

/**
 * FONT SIZE – scale phù hợp shop trẻ em (thoáng, dễ đọc)
 * Giữ nguyên các size hợp lý, chỉ điều chỉnh extreme cases
 */
const FONTSIZE_MAP = {
  // Quá nhỏ → nâng lên cho dễ đọc
  "text-xs"  : "text-sm",
  // Quá to, không cần thiết → giảm bớt
  "text-9xl" : "text-7xl",
  "text-8xl" : "text-6xl",
};

/**
 * FONT WEIGHT – trẻ em thích nhẹ nhàng, tránh quá đậm
 */
const FONTWEIGHT_MAP = {
  "font-black"      : "font-bold",
  "font-extrabold"  : "font-bold",
};

/**
 * BORDER RADIUS – bo tròn nhiều hơn, thân thiện hơn
 */
const RADIUS_MAP = {
  "rounded-none" : "rounded-md",
  "rounded-sm"   : "rounded-md",
  "rounded"      : "rounded-lg",
};

// ════════════════════════════════════════════════════════════
//  ENGINE – không cần chỉnh bên dưới
// ════════════════════════════════════════════════════════════

// Gộp tất cả map lại
const ALL_MAPS = [
  { name: "🎨 Màu sắc",     map: COLOR_MAP      },
  { name: "🔤 Font family", map: FONT_MAP        },
  { name: "📐 Font size",   map: FONTSIZE_MAP    },
  { name: "💪 Font weight", map: FONTWEIGHT_MAP  },
  { name: "⭕ Border radius",map: RADIUS_MAP     },
];

// Thống kê
const stats = {
  filesScanned   : 0,
  filesModified  : 0,
  totalReplacements: 0,
  byCategory     : {},
};
ALL_MAPS.forEach(m => { stats.byCategory[m.name] = 0; });

// Lấy danh sách file đệ quy
function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    // Bỏ qua node_modules, .git, .next, dist, build
    if (entry.isDirectory()) {
      if (["node_modules", ".git", ".next", "dist", "build", ".cache"].includes(entry.name)) continue;
      walkDir(full, files);
    } else if (EXTS.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

// Thay thế trong một chuỗi, trả về { content, count }
function applyMap(content, map, categoryName) {
  let count = 0;
  for (const [oldCls, newCls] of Object.entries(map)) {
    if (oldCls === newCls) continue;
    // Match class boundary: trước/sau là space, quote, { } [ ]
    const escaped = oldCls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex   = new RegExp(`(?<=[\\s"'\`{])${escaped}(?=[\\s"'\`}\\]])`, "g");
    const before  = content;
    content = content.replace(regex, newCls);
    const replaced = (before.match(regex) || []).length;
    if (replaced > 0) {
      count += replaced;
      stats.byCategory[categoryName] += replaced;
    }
  }
  return { content, count };
}

// Xử lý từng file
function processFile(filePath) {
  stats.filesScanned++;
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;
  let fileTotal = 0;
  const fileLog = [];

  for (const { name, map } of ALL_MAPS) {
    const { content: next, count } = applyMap(content, map, name);
    if (count > 0) {
      fileLog.push(`  ${name}: ${count} thay thế`);
      fileTotal += count;
    }
    content = next;
  }

  if (fileTotal > 0) {
    stats.filesModified++;
    stats.totalReplacements += fileTotal;

    const rel = path.relative(process.cwd(), filePath);
    console.log(`\n📄 ${rel}  (${fileTotal} thay đổi)`);
    fileLog.forEach(l => console.log(l));

    if (!DRY) {
      fs.writeFileSync(filePath, content, "utf8");
    }
  }
}

// ─── MAIN ────────────────────────────────────────────────────
console.log("╔════════════════════════════════════════════╗");
console.log("║  STITCH – Design Token Migrator            ║");
console.log("║  Shop quần áo trẻ em | Tailwind CSS        ║");
console.log("╚════════════════════════════════════════════╝");
console.log(`\nThư mục: ${path.resolve(ROOT)}`);
if (DRY) console.log("⚠️  DRY RUN – không ghi file\n");
else     console.log("✏️  Đang ghi trực tiếp vào file\n");

const files = walkDir(ROOT);
console.log(`Tìm thấy ${files.length} file cần quét...\n`);

files.forEach(processFile);

// ─── BÁO CÁO CUỐI ────────────────────────────────────────────
console.log("\n══════════════════════════════════════════════");
console.log("  KẾT QUẢ");
console.log("══════════════════════════════════════════════");
console.log(`  Files đã quét  : ${stats.filesScanned}`);
console.log(`  Files có thay đổi: ${stats.filesModified}`);
console.log(`  Tổng thay thế  : ${stats.totalReplacements}`);
console.log("\n  Chi tiết theo loại:");
for (const [cat, cnt] of Object.entries(stats.byCategory)) {
  if (cnt > 0) console.log(`    ${cat}: ${cnt}`);
}

if (DRY) {
  console.log("\n  ℹ️  Chạy lại không có --dry-run để áp dụng thật.");
} else if (stats.filesModified > 0) {
  console.log("\n  ✅ Hoàn tất! Nhớ kiểm tra lại UI trên browser.");
  console.log("  💡 Gợi ý: cập nhật tailwind.config.js để thêm");
  console.log("     font Nunito/Quicksand cho đúng tông trẻ em.");
}

console.log("══════════════════════════════════════════════\n");
