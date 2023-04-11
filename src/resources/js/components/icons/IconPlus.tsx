import IconsWrapper from "@/components/icons/IconsWrapper";

export default function IconPlus({iconColor = "currentColor", width = 14, height = 14, viewBox = "0 0 14 14"}: any) {
  function Icon() {
    return (
      <>
        <rect id="bounds" width="16" height="16" fill="none" />
        <path
          id="Icon"
          d="M-11694-13148v-5h-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5v-5a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5h5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5v5a1,1,0,0,1-1,1A1,1,0,0,1-11694-13148Z"
          transform="translate(11701 13162)"
          fill={iconColor}
          stroke="rgba(0,0,0,0)"
          strokeWidth="1"
        />
      </>
    )
  }

  return (
    <IconsWrapper width={width} height={height} viewBox={viewBox} Icon={Icon}></IconsWrapper>
  );
}
