import IconsWrapper from "@/components/icons/IconsWrapper";
import logo from "@/static/logo.png";

export default function IconLogo({ width = 14, height = 14, viewBox = "0 0 14 14"}: any) {
  return (
    <IconsWrapper width={width} height={height} viewBox={viewBox} src={logo}></IconsWrapper>
  );
}
