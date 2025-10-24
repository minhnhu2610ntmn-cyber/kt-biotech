import { BlogCard, Container, Heading } from '@ktbiotech/system-design';

export default function NewsSection() {
  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'Where does it come from?',
      author: 'Geogle Brown',
      date: 'Mar 8, 2022',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      imageSrc:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      imageAlt: 'Research blog image',
      badgeText: 'Blog nghiên cứu',
      badgeBackgroundColor: '#F0F0F0',
      badgeTextColor: '#1B1C1D',
      badgeArrowColor: '#808080',
      href: '/blog/research-1',
    },
    {
      id: 2,
      title: 'Where does it come from?',
      author: 'Geogle Brown',
      date: 'Mar 8, 2022',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      imageSrc:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      imageAlt: 'Company news image',
      badgeText: 'Tin Công Ty',
      badgeBackgroundColor: '#FFE4B5',
      badgeTextColor: '#1B1C1D',
      badgeArrowColor: '#FFA500',
      href: '/blog/company-news-1',
    },
    {
      id: 3,
      title: 'Where does it come from?',
      author: 'Geogle Brown',
      date: 'Mar 8, 2022',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      imageSrc:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      imageAlt: 'Knowledge image',
      badgeText: 'Kiến thức',
      badgeBackgroundColor: '#E6F3FF',
      badgeTextColor: '#1B1C1D',
      badgeArrowColor: '#4A90E2',
      href: '/blog/knowledge-1',
    },
  ];

  return (
    <section className='py-16 bg-gray-50'>
      <Container>
        {/* Section Title */}
        <Heading
          level={2}
          color='#215778'
          className='text-center mb-12 font-bold !text-3xl underline decoration-[#215778] decoration-1 underline-offset-4'
        >
          TIN TỨC
        </Heading>

        {/* Blog Cards Grid */}
        <div className='flex  gap-6'>
          <div className='flex-1'>
            <BlogCard
              direction='column'
              title={blogPosts[0].title}
              author={blogPosts[0].author}
              date={blogPosts[0].date}
              description={blogPosts[0].description}
              imageSrc={blogPosts[0].imageSrc}
              imageAlt={blogPosts[0].imageAlt}
              badgeText={blogPosts[0].badgeText}
            />
          </div>
          <div className='flex-1 flex flex-col gap-6'>
            <div className='flex-1 flex flex-col justify-center'>
              <BlogCard
                title={blogPosts[1].title}
                author={blogPosts[1].author}
                date={blogPosts[1].date}
                description={blogPosts[1].description}
                imageSrc={blogPosts[1].imageSrc}
                imageAlt={blogPosts[1].imageAlt}
                badgeText={blogPosts[1].badgeText}
              />
            </div>
            <div className='flex-1 flex flex-col justify-center'>
              <BlogCard
                title={blogPosts[2].title}
                author={blogPosts[2].author}
                date={blogPosts[2].date}
                description={blogPosts[2].description}
                imageSrc={blogPosts[2].imageSrc}
                imageAlt={blogPosts[2].imageAlt}
                badgeText={blogPosts[2].badgeText}
              />
            </div>
            <div className='flex-1 flex flex-col justify-center'>
              <BlogCard
                title={blogPosts[2].title}
                author={blogPosts[2].author}
                date={blogPosts[2].date}
                description={blogPosts[2].description}
                imageSrc={blogPosts[2].imageSrc}
                imageAlt={blogPosts[2].imageAlt}
                badgeText={blogPosts[2].badgeText}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
