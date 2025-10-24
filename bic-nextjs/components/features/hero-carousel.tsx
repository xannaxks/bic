"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const carouselImages = [
  {
    src: "https://www.tu.ac.kr/_attach/tongmyong/editor-image/2024/12/oIMGITGgxBeIiQuJpxlvDneMRQ.jpg",
    alt: "Tongmyong University Main Campus",
    title: "Welcome to Tongmyong University",
    description: "Excellence in Education and Innovation",
  },
  // {
  //   src: "https://www.tu.ac.kr/_res/tongmyong/english/img/sub06_02_img01.jpg",
  //   alt: "Tongmyong University Academic Building",
  //   title: "Shape Your Future",
  //   description: "Join our community of learners and leaders",
  // },
  {
    src: "https://media.licdn.com/dms/image/v2/C561BAQF5yiAajvWt9Q/company-background_10000/company-background_10000/0/1627639676128/tongmyong_university_cover?e=2147483647&v=beta&t=UqhA0VefMPix5eav-Q4Su2yekmaO6X0VVrZmdGkTJbc",
    alt: "Tongmyong University Campus View",
    title: "Global Opportunities",
    description: "Connect with students from around the world",
  },
  {
    src: "https://international.fpt.edu.vn/web/image/image.gallery/1242/image",
    alt: "Tongmyong University International Campus",
    title: "Innovation Hub",
    description: "State-of-the-art facilities for tomorrow's innovators",
  },
  // {
  //   src: "https://www.tu.ac.kr/_attach/tongmyong/editor-image/2024/12/oIMGITGgxBeIiQuJpxlvDneMRQ.jpg",
  //   alt: "Tongmyong University Campus Life",
  //   title: "Your Journey Starts Here",
  //   description: "Discover endless possibilities at TU",
  // },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {carouselImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-screen w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                quality={95}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
                <h1
                  className={`mb-4 text-center text-4xl font-bold transition-all duration-700 md:text-6xl ${
                    current === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  {image.title}
                </h1>
                <p
                  className={`max-w-3xl text-center text-lg transition-all delay-200 duration-700 md:text-2xl ${
                    current === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  {image.description}
                </p>
                <div
                  className={`mt-8 flex gap-4 transition-all delay-300 duration-700 ${
                    current === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <a
                    href="https://www.tu.ac.kr/ic/index.do"
                    // target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-white px-8 py-3 font-semibold text-black transition-all duration-300 ease-out hover:scale-105 hover:bg-gray-100 hover:shadow-2xl inline-block"
                  >
                    Apply Now
                  </a>
                  <a
                    href="https://www.tu.ac.kr/ic/index.do"
                    rel="noop"
                    className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-white hover:text-black hover:shadow-2xl">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 h-12 w-12 border-white/50 bg-black/20 text-white transition-all duration-300 hover:scale-110 hover:bg-black/40" />
      <CarouselNext className="right-4 h-12 w-12 border-white/50 bg-black/20 text-white transition-all duration-300 hover:scale-110 hover:bg-black/40" />
    </Carousel>
  );
}

export function CarouselDemo() {
  return (
    <Carousel className="mx-auto w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
