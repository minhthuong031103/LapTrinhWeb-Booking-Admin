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
            src="https://wallpapers.com/images/high/empty-hotel-pool-hz69918462ys5c1k.webp"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />

          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Tôi luôn tin rằng một khách sạn tốt không chỉ là nơi cung
                cấp giường ngủ, mà còn là nơi tạo ra những trải nghiệm khó
                quên.&rdquo;
              </p>
              <footer className="text-sm">Sir Richard Branson</footer>
            </blockquote>
          </div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
        <div>
          <Image
            src="https://wallpapers.com/images/high/the-majestic-burj-al-arab-hotel-illuminated-at-night-o0jr59cenbmvpf8l.webp"
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
                &ldquo;Khách sạn tốt là nơi bạn có thể cảm thấy như ở nhà, nhưng
                với dịch vụ hoàn hảo và không gian đẳng cấp.&rdquo;
              </p>
              <footer className="text-sm">Diane von Furstenberg</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://wallpapers.com/images/high/hotel-background-1p0marlvz82c3lgi.webp"
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
                &ldquo;Mỗi khách sạn có câu chuyện của riêng mình, và việc khám
                phá những câu chuyện đó là một phần quan trọng của trải nghiệm
                du lịch.&rdquo;
              </p>
              <footer className="text-sm">Anthony Bourdain</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://wallpapers.com/images/high/hotel-background-9ulv371hiwie85tw.webp"
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
                &ldquo;Khách sạn tốt là nơi bạn muốn trở lại sau mỗi chuyến đi,
                vì bạn biết rằng bạn sẽ luôn được đón tiếp một cách ấm áp và
                chuyên nghiệp.&rdquo;
              </p>
              <footer className="text-sm">Conrad Hilton</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://wallpapers.com/images/high/hotel-background-bglwmx8t4s1ofh67.webp"
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
                &ldquo;Đối với tôi, khách sạn không chỉ là một nơi để ngủ qua
                đêm, mà còn là một bức tranh lớn được tạo ra từ sự kỳ công, sự
                đam mê và sự chăm sóc đến từ mỗi chi tiết nhỏ nhất. Tôi luôn tin
                rằng mỗi khách sạn không chỉ là một điểm đến, mà còn là một phần
                của cuộc hành trình của mỗi du khách.&rdquo;
              </p>
              <footer className="text-sm">Steve Wynn</footer>
            </blockquote>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default AuthCarousel;
