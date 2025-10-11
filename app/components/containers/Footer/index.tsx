'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@ktbiotech/system-design';

interface FooterProps {
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
}

export default function Footer({ 
  showNewsletter = true,
  onNewsletterSubmit 
}: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (onNewsletterSubmit) {
      onNewsletterSubmit(email);
    } else {
      console.log('Newsletter subscription:', email);
    }
  };

  return (
    <footer className="bg-blue-600 text-white">
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-blue-500">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6">
                Subscribe to our newsletter for the latest insights, research, and innovations in biotechnology.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-700 text-white placeholder-blue-200 border border-blue-500 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <Button type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information and Working Hours */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_200px] gap-12">
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-6 text-xl">Thông tin liên hệ</h4>
            <div className="space-y-4">
              <div className="text-lg font-bold">
                CÔNG TY TNHH CÔNG NGHỆ SINH HỌC KHOA THƯƠNG
              </div>
              <div className="space-y-2 text-blue-100">
                <div>Điện thoại: (+84) 28.3761.2606</div>
                <div>Email: Sales@kt-biotech.com</div>
                <div>Email: Info@kt-biotech.com</div>
                <div>Địa chỉ: Số 10-12, đường số 3, KDC Gia Hòa, Phường Phong Phú, tp Hồ Chí Minh</div>
              </div>
            </div>
          </div>

         

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-xl">Liên kết nhanh</h4>
            <div className="space-y-2 text-blue-100">
              <div>
                <Link href="/about" className="hover:text-white transition-colors">
                  Giới thiệu
                </Link>
              </div>
              <div>
                <Link href="/products" className="hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </div>
              <div>
                <Link href="/services" className="hover:text-white transition-colors">
                  Dịch vụ
                </Link>
              </div>
              <div>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>

           {/* Working Hours */}
           <div>
            <h4 className="font-semibold mb-6 text-xl">Thời gian làm việc</h4>
            <div className="space-y-4 text-blue-100">
              <div>
                <div className="font-medium mb-2">Thứ 2 đến thứ 6</div>
                <div className="ml-4 space-y-1">
                  <div>– Sáng: 07h30 – 12h00</div>
                  <div>– Chiều: 13h30 – 17h00</div>
                </div>
              </div>
              <div className="font-medium">
                Thứ 7 – Chủ nhật không làm việc
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-blue-100 text-sm">
              &copy; 2024 KTBioTech. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-100 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-blue-100 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
