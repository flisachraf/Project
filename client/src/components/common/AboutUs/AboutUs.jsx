import React from 'react';

const AboutUs = () => {
    return (
        <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg'>
            <section className='mb-8'>
                <br/>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>من نحن</h2>
                <p className='text-gray-600 leading-relaxed'>
                    موقع توليب نيوز هو أول موقع إخباري تونسي ليبي شامل، يهدف إلى تقديم تغطية شاملة لأهم الأحداث والأخبار في تونس وليبيا والعالم بأسره.
                    نحن فريق من الصحفيين المحترفين والمحررين ذوي الخبرة، نعمل بجد لتزويدكم بالأخبار الدقيقة والتحليلات العميقة.
                </p>
            </section>

            <section className='mb-8'>
                <h3 className='text-xl font-semibold text-gray-700 mb-2'>مهمتنا:</h3>
                <ul className='list-disc list-inside space-y-2 text-gray-600'>
                    <li><strong className='font-semibold'>الشفافية:</strong> تقديم الأخبار والمعلومات بكل حيادية وصدق.</li>
                    <li><strong className='font-semibold'>التنوع:</strong> تغطية واسعة تشمل السياسة، الاقتصاد، الثقافة، الرياضة، التكنولوجيا، والمزيد.</li>
                    <li><strong className='font-semibold'>التحديث المستمر:</strong> تقديم الأخبار العاجلة والتقارير الفورية لضمان بقاءكم على اطلاع دائم بكل ما يحدث.</li>
                </ul>
            </section>

            <section className='mb-8'>
                <h3 className='text-xl font-semibold text-gray-700 mb-2'>ما نقدمه:</h3>
                <ul className='list-disc list-inside space-y-2 text-gray-600'>
                    <li><strong className='font-semibold'>الأخبار المحلية:</strong> تغطية متميزة لأهم الأحداث في تونس وليبيا، مع التركيز على القضايا التي تهم المواطنين.</li>
                    <li><strong className='font-semibold'>الأخبار العالمية:</strong> متابعة لأبرز المستجدات العالمية، مع تحليلات معمقة من خبرائنا.</li>
                    <li><strong className='font-semibold'>التقارير والتحليلات:</strong> تقديم تقارير مفصلة وتحليلات دقيقة للأحداث الكبرى لتوضيح السياق وتقديم رؤى أعمق.</li>
                    <li><strong className='font-semibold'>الوسائط المتعددة:</strong> توفير محتوى متنوع يشمل المقالات، الصور، الفيديوهات، والإنفوجرافيك.</li>
                </ul>
            </section>

            <section className='mb-8'>
                <h3 className='text-xl font-semibold text-gray-700 mb-2'>انضموا إلينا:</h3>
                <p className='text-gray-600 leading-relaxed'>
                    ندعوكم للانضمام إلى مجتمع توليب نيوز، حيث يمكنكم متابعة آخر الأخبار والتقارير، والمشاركة في النقاشات، ومشاركة آرائكم وتعليقاتكم.
                    نحن هنا لنسمعكم ولنعمل معًا على تقديم محتوى يلبي تطلعاتكم واحتياجاتكم.
                </p>
                <p className='text-gray-600'>تابعونا على [روابط وسائل التواصل الاجتماعي] لتحصلوا على تحديثات فورية وآنية.</p>
            </section>

            <section>
                <h3 className='text-xl font-semibold text-gray-700 mb-2'>اتصل بنا:</h3>
                <p className='text-gray-600 mb-2'>إذا كان لديكم أي استفسارات أو اقتراحات، لا تترددوا في الاتصال بنا عبر:</p>
                <ul className='list-disc list-inside space-y-2 text-gray-600'>
                    <li><a href="mailto:tulibnews@gmail.com" className='text-blue-500 hover:underline'>tulibnews@gmail.com</a></li>
                    <li>0021623050630</li>
                    <li>00218946986575</li>
                </ul>
            </section>
        </div>
    );
}

export default AboutUs;
