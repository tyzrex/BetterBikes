import {
  SiYamahacorporation,
  SiBmw,
  SiSuzuki,
  SiKtm,
  SiDucati,
  SiHonda,
} from "react-icons/si";
export default function LogoCloud() {
  const images = [
    <SiYamahacorporation
      key="yamaha"
      className="text-7xl text-main-foreground"
    />,
    <SiBmw key="bmw" className="text-7xl text-main-foreground" />,
    <SiSuzuki key="suzuki" className="text-7xl text-main-foreground" />,
    <SiKtm key="ktm" className="text-7xl text-main-foreground" />,
    <SiDucati key="ducati" className="text-7xl text-main-foreground" />,
    <SiHonda key="honda" className="text-7xl text-main-foreground" />,
  ];

  return (
    <section className="py-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl lg:text-5xl lg:leading-[1.2] font-semibold text-main-foreground text-center md:text-left">
          Bike Brands We Have Partnered With
        </h1>
        <p className="text-lg text-main-light mt-2 mb-5">
          We have partnered with many companies to provide you with the best
          experience
        </p>
      </div>
      <div className={`bg-gray-100 rounded-3xl`}>
        <div className="mx-auto rounded-3xl py-8 border-b-4 border-b-main-accent px-4 w-full">
          <div className="grid grid-cols-6 lg:grid-cols-6 gap-y-10 gap-x-2">
            {images.map((image: any, index: number) => (
              <div
                key={index}
                className="col-span-3 sm:col-span-2 lg:col-span-1 flex justify-center items-center"
              >
                <div className="w-full h-full flex justify-center items-center">
                  {image}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
