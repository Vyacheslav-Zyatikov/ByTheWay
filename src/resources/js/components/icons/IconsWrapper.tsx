const imageStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  objectFit: "cover",
  minWidth: "100%",
  minHeight: "100%",
  width: "100%",
}

export default function IconsWrapper({Icon, width = 18, height = 18, viewBox = "0 0 18 18", id = "icon", src = ""}: any) {
  return (
    <div>
      {src === ""
        ? <div style={{width: width + "px", height: height + "px"}}>
            <svg
              className="image"
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              viewBox={viewBox}
              id={id}
            >
              <Icon></Icon>
            </svg>
          </div>
          : <div style={{width: width + "px", height: height + "px", position: "relative", overflow: "hidden"}}>
              <img style={imageStyle} src={src} alt="icon" />
            </div>
      }
    </div>
  );
}
