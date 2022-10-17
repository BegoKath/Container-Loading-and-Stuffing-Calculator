import React from "react";
interface Props{
  bgcolor: string, progress: string, height: number
}

const Progressbar = ({bgcolor, progress, height}:Props) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    marginBottom:20
  };

  const progresstext = {
    color: "black",
    fontWeight: 15,
    fontSize:"13px" ,
    paddingRight:10 
  };

  return (
    <div style={Parentdiv}>
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: bgcolor,
          borderRadius: 40,
          textAlign: "right",     
             
        }}
      >
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default Progressbar;
