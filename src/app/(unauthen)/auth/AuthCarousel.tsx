"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
function AuthCarousel() {
  return (
    <div className="relative hidden h-screen w-1/2 flex-col bg-muted text-white dark:border-r lg:flex">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        <div className="h-screen w-full">
          <Image
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />

          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Đừng cố nói cho khách hàng biết họ muốn gì. Nếu bạn muốn
                là kẻ thông minh, vận dụng óc thông minh trong lúc tắm. Sau đó
                hãy ra ngoài, đi làm, và phục vụ khách hàng&rdquo;
              </p>
              <footer className="text-sm">Gene Buckley</footer>
            </blockquote>
          </div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Nếu bạn xây dựng được trải nghiệm tuyệt vời, khách hàng
                sẽ nói với nhau về điều đó. Lời truyền miệng có sức mạnh rất
                lớn&rdquo;
              </p>
              <footer className="text-sm">Jeff Bezos</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Bạn sẽ không bao giờ đạt lợi thế về sản phẩm hoặc giá cả
                nữa. Chúng rất dễ bị sao chép. Nhưng người ta không thể sao chép
                một văn hóa dịch vụ khách hàng tuyệt vời&rdquo;
              </p>
              <footer className="text-sm">Jerry Fritz</footer>
            </blockquote>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default AuthCarousel;
