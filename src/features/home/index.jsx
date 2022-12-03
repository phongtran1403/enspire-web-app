import { Carousel, Image } from 'antd'
import React from 'react'

export default function HomePage() {
    return (
        <div>
            <Carousel autoplay>
                <Image preview={false} src='https://enspire.edu.vn/wp-content/uploads/resized/095a75b40936756ace170b1448fcb83c/Banner-Website-03.jpg' />
                <Image preview={false} src='https://enspire.edu.vn/wp-content/uploads/resized/390615e3666a87146f6738ae11a7010d/1400x420_trang-new.jpg' />
                <Image preview={false} src='https://enspire.edu.vn/wp-content/uploads/resized/5566287d980af32f2f93f700fd648b30/1400x420-new.jpg' />

            </Carousel>
        </div>
    )
}