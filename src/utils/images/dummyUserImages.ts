import { CarouselImage } from "@/components/ui/UserImageCarousel";

const IMAGE_COUNT_DEFAULT = 13;
const IMAGE_COUNT_MIN = 1;
const IMAGE_COUNT_MAX = 20;

const imageSeedPool = [
  { seed: "workspace", alt: "ワークスペース" },
  { seed: "team-meeting", alt: "チームミーティング" },
  { seed: "presentation", alt: "プレゼンテーション" },
  { seed: "brainstorm", alt: "ブレーンストーミング" },
  { seed: "workspace-detail", alt: "デスクと資料" },
  { seed: "coding", alt: "コーディング作業" },
  { seed: "pairwork", alt: "ペアワーク" },
  { seed: "office-lounge", alt: "オフィスラウンジ" },
  { seed: "whiteboard", alt: "ホワイトボード説明" },
  { seed: "remote-call", alt: "オンラインミーティング" },
  { seed: "support-desk", alt: "サポートチーム" },
  { seed: "analytics", alt: "分析ダッシュボード" },
  { seed: "workspace-night", alt: "夜のオフィス" },
] as const;

export const createDummyUserImages = (count: number): CarouselImage[] => {
  if (count <= 0) return [];

  const selectedIndices: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const randomIndex = Math.floor(Math.random() * imageSeedPool.length);
    selectedIndices.push(randomIndex);
  }

  if (count > 1) {
    const uniqueIndices = new Set(selectedIndices);
    if (uniqueIndices.size === 1) {
      const originalIndex = selectedIndices[0];
      const offset =
        imageSeedPool.length > 1
          ? (Math.floor(Math.random() * (imageSeedPool.length - 1)) + 1) %
            imageSeedPool.length
          : 0;
      const alternativeIndex = (originalIndex + offset) % imageSeedPool.length;
      selectedIndices[1] =
        alternativeIndex === originalIndex
          ? (originalIndex + 1) % imageSeedPool.length
          : alternativeIndex;
    }
  }

  const timestamp = Date.now();

  return selectedIndices.map((poolIndex, position) => {
    const base = imageSeedPool[poolIndex];
    const seed = `${base.seed}-${timestamp}-${position}-${Math.floor(
      Math.random() * 1000
    )}`;
    return {
      id: `${base.seed}-${timestamp}-${position}`,
      src: `https://picsum.photos/seed/${seed}/960/640`,
      alt: base.alt,
    };
  });
};

export const getDefaultImageCount = () => IMAGE_COUNT_DEFAULT;
export const getMinImageCount = () => IMAGE_COUNT_MIN;
export const getMaxImageCount = () => IMAGE_COUNT_MAX;
