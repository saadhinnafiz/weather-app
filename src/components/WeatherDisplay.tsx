type WeatherDisplayProps = {
  data: any;
};

export default function WeatherDisplay(props: WeatherDisplayProps) {
  return (
    <>
      <h2>{props.data.name}</h2>
    </>
  );
}
