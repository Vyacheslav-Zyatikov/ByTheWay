import IconsWrapper from "@/components/icons/IconsWrapper";

export default function IconMinus({iconColor = "currentColor", width = 14, height = 14, viewBox = "0 0 14 14"}: any) {
  function Icon() {
    return (
      <>
        <defs>
          <clipPath id="clip-path">
            <rect id="bounds" width="18" height="18" fill="none"/>
          </clipPath>
        </defs>
        <g id="Collapse_Window" data-name="Collapse Window" transform="translate(9 9)">
          <g id="Icon_Collapse_Window" data-name="Icon / Collapse Window" transform="translate(-9 -9)">
            <g id="Group_9620" data-name="Group 9620" clipPath="url(#clip-path)">
              <rect id="Icon_Collapse_Window-2" data-name="Icon / Collapse Window" width="18" height="2.25" rx="1.125" transform="translate(0 7.875)" fill={iconColor}/>
            </g>
          </g>
        </g>
      </>
    )
  }

  return (
    <IconsWrapper width={width} height={height} viewBox={viewBox} Icon={Icon}></IconsWrapper>
  );
}
