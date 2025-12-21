import type { CSSProperties } from "react";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, SxProps, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export type CarouselImage = {
  id: string;
  src: string;
  alt: string;
};

type Props = {
  images: CarouselImage[];
  showThumbnails?: boolean;
  maxWidth?: number;
  carouselHeight?: number;
  containerSx?: SxProps<Theme>;
  thumbnailColumns?: number;
  thumbnailRows?: number;
};

export const UserImageCarousel = ({
  images,
  showThumbnails = true,
  maxWidth = 640,
  carouselHeight = 320,
  containerSx,
  thumbnailColumns = 5,
  thumbnailRows,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  if (images.length === 0) {
    return null;
  }

  const resolvedColumns = Math.min(
    Math.max(Math.floor(thumbnailColumns), 1),
    5
  );
  const resolvedRows =
    typeof thumbnailRows === "number" && thumbnailRows >= 1
      ? Math.floor(thumbnailRows)
      : undefined;
  const rowHeight = 70;
  const shouldScroll =
    resolvedRows !== undefined &&
    images.length > resolvedRows * resolvedColumns;
  const scrollContainerStyles: CSSProperties | undefined =
    shouldScroll && resolvedRows
      ? {
          maxHeight: resolvedRows * rowHeight,
          overflowY: "auto",
          paddingRight: 8,
        }
      : undefined;
  const shouldShowIndicators = showThumbnails && images.length > 1;
  const indicatorBorderRadius =
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : theme.shape.borderRadius;
  const indicatorContainerStyle: CSSProperties = {
    maxWidth,
    margin: "24px auto 0",
    display: "grid",
    gridTemplateColumns: `repeat(${resolvedColumns}, minmax(0, 1fr))`,
    gap: 8,
    ...(scrollContainerStyles ?? {}),
  };
  const indicatorIconButtonStyle: CSSProperties = {
    width: "100%",
    height: rowHeight,
    padding: 0,
    borderRadius: indicatorBorderRadius,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
  };
  const activeIndicatorIconButtonStyle: CSSProperties = {
    border: `2px solid ${theme.palette.primary.main}`,
  };
  const indicatorIcons = shouldShowIndicators
    ? images.map((image) => (
        <Box
          key={`${image.id}-indicator`}
          component="img"
          src={image.src}
          alt={`${image.alt} サムネイル`}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ))
    : undefined;
  const indicatorProps = shouldShowIndicators
    ? {
        IndicatorIcon: indicatorIcons,
        indicatorContainerProps: {
          style: indicatorContainerStyle,
        },
        indicatorIconButtonProps: {
          style: indicatorIconButtonStyle,
          "aria-label": "carousel thumbnail",
        },
        activeIndicatorIconButtonProps: {
          style: activeIndicatorIconButtonStyle,
        },
      }
    : {};

  return (
    <Box sx={{ width: "100%", ...containerSx }}>
      <Carousel
        navButtonsAlwaysVisible
        animation="slide"
        autoPlay={false}
        indicators={shouldShowIndicators}
        index={activeIndex}
        onChange={(now) => {
          if (typeof now === "number") {
            setActiveIndex(now);
          }
        }}
        sx={{ maxWidth, margin: "0 auto", mb: shouldShowIndicators ? 2 : 0 }}
        {...indicatorProps}
      >
        {images.map((image) => (
          <Box
            key={image.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: carouselHeight,
              backgroundColor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={image.src}
              alt={image.alt}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default UserImageCarousel;
