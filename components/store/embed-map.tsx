import React from "react";

interface EmbeddedMapProps {
  address: string;
  width: string;
  height: string;
}

const EmbeddedMap: React.FC<EmbeddedMapProps> = ({
  address,
  width,
  height,
}) => {
  const encodedAddress = encodeURIComponent(address);
  const googleMapsSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;

  return (
    <div style={{ border: 0 }}>
      <iframe
        className=" rounded-lg"
        width={width}
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={googleMapsSrc}
      ></iframe>
    </div>
  );
};

export default EmbeddedMap;
