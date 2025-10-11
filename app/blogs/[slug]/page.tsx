'use client';

import React from 'react';
import { BlogPost } from '@ktbiotech/blog';
import { Button } from '@ktbiotech/system-design';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock blog posts data (in real app, this would come from a CMS or API)
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advances in CRISPR Technology',
    content: `
# Advances in CRISPR Technology

The field of biotechnology has witnessed remarkable progress in recent years, with CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) technology standing at the forefront of this revolution. This groundbreaking gene-editing tool has transformed our ability to modify genetic material with unprecedented precision and efficiency.

## Understanding CRISPR

CRISPR technology functions like molecular scissors, allowing scientists to cut and modify specific DNA sequences within living cells. The system consists of two main components:

1. **Cas9 protein**: Acts as the molecular scissors
2. **Guide RNA**: Directs the Cas9 protein to the exact location in the genome

## Recent Breakthroughs

### Enhanced Precision
Recent developments have significantly improved the accuracy of CRISPR systems. New variants like Cas12 and Cas13 offer different cutting mechanisms, while base editing and prime editing technologies enable more precise modifications without creating double-strand breaks.

### Therapeutic Applications
CRISPR has shown tremendous potential in treating genetic diseases:

- **Sickle Cell Disease**: Clinical trials have demonstrated successful treatment using CRISPR-edited stem cells
- **Beta-Thalassemia**: Patients have shown sustained therapeutic benefits
- **Huntington's Disease**: Research is ongoing for neurodegenerative disease treatment

### Agricultural Innovations
The technology is revolutionizing agriculture by:

- Developing disease-resistant crops
- Improving nutritional content
- Reducing pesticide dependency
- Enhancing crop yields in challenging environments

## Challenges and Considerations

While CRISPR offers immense potential, several challenges remain:

- **Off-target effects**: Ensuring modifications occur only at intended locations
- **Delivery methods**: Efficiently transporting CRISPR components to target cells
- **Ethical considerations**: Balancing innovation with responsible use
- **Regulatory frameworks**: Establishing appropriate oversight mechanisms

## Future Prospects

The future of CRISPR technology looks promising, with ongoing research focusing on:

- **In vivo applications**: Direct editing within the body
- **Multiplex editing**: Simultaneous modification of multiple genes
- **Epigenetic editing**: Modifying gene expression without changing DNA sequence
- **Synthetic biology integration**: Combining with other biotechnological approaches

## Conclusion

CRISPR technology represents a paradigm shift in biotechnology, offering unprecedented opportunities for treating diseases, improving agriculture, and advancing scientific understanding. As research continues and applications expand, we can expect even more remarkable developments in this field.

The key to maximizing CRISPR's potential lies in continued investment in research, responsible development practices, and thoughtful consideration of ethical implications. With proper oversight and continued innovation, CRISPR technology has the potential to revolutionize medicine and agriculture for the benefit of humanity.
    `,
    excerpt: 'Recent breakthroughs in CRISPR gene editing technology are revolutionizing biotechnology and opening new possibilities for treating genetic diseases.',
    author: 'Dr. Sarah Chen',
    publishedAt: new Date('2024-01-15'),
    tags: ['Biotechnology', 'Gene Editing', 'Research'],
    slug: 'advances-crispr-technology'
  },
  {
    id: '2',
    title: 'Sustainable Biotech Solutions for Climate Change',
    content: `
# Sustainable Biotech Solutions for Climate Change

Climate change represents one of the most pressing challenges of our time, and biotechnology is emerging as a powerful ally in our fight against environmental degradation. Through innovative approaches that harness biological processes, we can develop sustainable solutions that address climate change while promoting environmental health.

## The Role of Biotechnology in Climate Mitigation

### Carbon Capture and Utilization
Biotechnology offers novel approaches to carbon management:

- **Microbial carbon fixation**: Engineering microorganisms to capture CO2 more efficiently
- **Bio-based materials**: Developing carbon-negative materials from biological sources
- **Algal systems**: Using algae for large-scale carbon sequestration

### Renewable Energy Solutions
Biological systems are being harnessed for clean energy:

- **Biofuels**: Advanced biofuels from non-food biomass
- **Biological hydrogen production**: Using microorganisms to produce clean hydrogen
- **Biogas optimization**: Improving efficiency of anaerobic digestion processes

## Agricultural Innovations

### Climate-Resilient Crops
Biotechnology is developing crops that can thrive in changing conditions:

- **Drought-resistant varieties**: Crops that require less water
- **Heat-tolerant plants**: Varieties that perform well in higher temperatures
- **Salinity-resistant crops**: Plants that grow in saline soils

### Sustainable Farming Practices
- **Precision agriculture**: Using biotechnology to optimize resource use
- **Biological pest control**: Reducing chemical pesticide dependency
- **Soil health improvement**: Enhancing soil microbiome for better carbon storage

## Industrial Biotechnology

### Green Manufacturing
- **Bio-based chemicals**: Replacing petroleum-derived chemicals
- **Enzymatic processes**: More efficient and cleaner manufacturing
- **Waste valorization**: Converting industrial waste into valuable products

### Circular Economy
- **Biodegradable materials**: Developing materials that naturally decompose
- **Resource recovery**: Extracting valuable materials from waste streams
- **Life cycle optimization**: Designing products for complete recyclability

## Marine Biotechnology

### Ocean Health
- **Coral reef restoration**: Using biotechnology to help coral survive climate change
- **Marine pollution cleanup**: Biological solutions for ocean contamination
- **Sustainable aquaculture**: Developing environmentally friendly fish farming

### Blue Carbon
- **Seagrass restoration**: Protecting and restoring carbon-sequestering marine plants
- **Mangrove conservation**: Preserving these critical carbon sinks
- **Marine algae farming**: Large-scale carbon capture through marine biomass

## Challenges and Opportunities

### Technical Challenges
- **Scale-up**: Moving from lab to industrial scale
- **Cost-effectiveness**: Making biotech solutions economically viable
- **Integration**: Combining multiple biotechnological approaches

### Policy and Regulation
- **Risk assessment**: Evaluating environmental and health impacts
- **International cooperation**: Coordinating global efforts
- **Public acceptance**: Building trust in biotechnological solutions

## Future Directions

### Emerging Technologies
- **Synthetic biology**: Designing biological systems for specific environmental functions
- **Gene editing**: Developing organisms optimized for environmental applications
- **Biomimetics**: Learning from nature to solve environmental problems

### Integrated Approaches
- **Systems thinking**: Considering entire ecosystems in solution design
- **Cross-sector collaboration**: Bringing together diverse expertise
- **Technology convergence**: Combining biotechnology with other emerging technologies

## Conclusion

Biotechnology holds immense promise for addressing climate change through sustainable, innovative solutions. By harnessing biological processes and systems, we can develop approaches that not only mitigate climate change but also promote environmental health and sustainability.

The key to success lies in continued research and development, responsible implementation, and collaboration across sectors. As we face the urgent challenge of climate change, biotechnology offers hope for a more sustainable future.

Investing in biotechnological solutions today will pay dividends for generations to come, helping us build a world that is not only climate-resilient but also environmentally thriving.
    `,
    excerpt: 'How biotechnology is leading the way in sustainable solutions for environmental challenges and climate change mitigation.',
    author: 'Dr. Michael Rodriguez',
    publishedAt: new Date('2024-01-10'),
    tags: ['Sustainability', 'Biotechnology', 'Environment'],
    slug: 'sustainable-biotech-solutions'
  }
];

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/blogs">
              <Button variant="outline">
                ← Back to Blog
              </Button>
            </Link>
            <div className="flex gap-3">
              <Button variant="outline">
                Share
              </Button>
              <Button>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <time>{formatDate(post.publishedAt)}</time>
              <span>•</span>
              <span>by {post.author}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="whitespace-pre-wrap text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{post.author}</h4>
                <p className="text-gray-600 mt-1">
                  Leading researcher in biotechnology with over 15 years of experience 
                  in gene editing and sustainable biotech solutions. Published author 
                  of numerous peer-reviewed papers and recipient of multiple research awards.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blogs/${relatedPost.slug}`}
                    className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>by {relatedPost.author}</span>
                      <time>{formatDate(relatedPost.publishedAt)}</time>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
