import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, ButtonBase, SxProps, Theme, Typography } from "@mui/material";

export type CarouselImage = {
  id: string;
  src: string;
  alt: string;
};

type Props = {
  title?: string;
  images: CarouselImage[];
  showThumbnails?: boolean;
  maxWidth?: number;
  carouselHeight?: number;
  containerSx?: SxProps<Theme>;
};

export const UserImageCarousel = ({
  title,
  images,
  showThumbnails = true,
  maxWidth = 640,
  carouselHeight = 320,
  containerSx,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", ...containerSx }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Carousel
        navButtonsAlwaysVisible
        animation="slide"
        autoPlay={false}
        indicators={false}
        index={activeIndex}
        onChange={(now) => {
          if (typeof now === "number") {
            setActiveIndex(now);
          }
        }}
        sx={{ maxWidth, margin: "0 auto", mb: showThumbnails ? 2 : 0 }}
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
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Carousel>
      {showThumbnails && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 1,
            maxWidth,
            margin: "0 auto",
            mt: 3,
          }}
        >
          {images.map((image, index) => (
            <ButtonBase
              key={`${image.id}-thumbnail`}
              onClick={() => setActiveIndex(index)}
              focusRipple
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                border: index === activeIndex ? "2px solid" : "1px solid",
                borderColor:
                  index === activeIndex ? "primary.main" : "divider",
                width: "100%",
                height: 64,
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={`${image.alt} サムネイル`}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </ButtonBase>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserImageCarousel;
