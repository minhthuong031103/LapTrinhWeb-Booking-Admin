'use client';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
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
            src="https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />

          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Sự hỗ trợ chuyên nghiệp và cách tiếp cận cá nhân hóa từ
                đội ngũ của bạn đã giúp chúng tôi xây dựng một mạng lưới khách
                hàng trung thành và mang lại hiệu suất kinh doanh tốt
                nhất.&rdquo;
              </p>
              <footer className="text-sm">Richard Branson</footer>
            </blockquote>
          </div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1622396089527-b40d16c63aba?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                &ldquo;Chúng tôi rất may mắn có cơ hội được làm việc với dịch vụ
                của bạn. Sự chuyên nghiệp, hiệu quả và sự hỗ trợ tận tình từ đội
                ngũ của bạn đã giúp chúng tôi tối ưu hóa hoạt động kinh doanh
                của mình và mang lại sự hài lòng cao nhất cho khách hàng&rdquo;
              </p>
              <footer className="text-sm">Anthony James</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1565031491910-e57fac031c41?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                &ldquo;Đối với chúng tôi, dịch vụ đặt phòng của bạn không chỉ là
                một công cụ quản lý đơn thuần. Sự linh hoạt trong việc tùy
                chỉnh, giao diện dễ sử dụng và tính bảo mật cao đã tạo ra một
                trải nghiệm vô cùng tốt cho cả khách hàng và đối tác.&rdquo;
              </p>
              <footer className="text-sm">Michael Jordan</footer>
            </blockquote>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default AuthCarousel;
