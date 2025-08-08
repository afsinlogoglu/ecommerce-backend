import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting product service seeder...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('��️  Cleared existing data');

  // First: Create categories
  console.log('📂 Creating categories...');
  
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets'
    }
  });

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Fashion and apparel'
    }
  });

  const books = await prisma.category.create({
    data: {
      name: 'Books',
      description: 'Books and literature'
    }
  });

  const homeGarden = await prisma.category.create({
    data: {
      name: 'Home & Garden',
      description: 'Home improvement and garden products'
    }
  });

  const sports = await prisma.category.create({
    data: {
      name: 'Sports',
      description: 'Sports equipment and accessories'
    }
  });

  console.log('✅ Created categories:', [electronics.name, clothing.name, books.name, homeGarden.name, sports.name]);

  // Second: Create products with valid category IDs
  console.log('📦 Creating products...');

  const products = await Promise.all([
    // Electronics
    prisma.product.create({
      data: {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip',
        price: 999.99,
        sku: 'IPHONE-15-PRO-001',
        categoryId: electronics.id,
        stock: 50,
        isActive: true,
        images: [
          'https://example.com/iphone15pro-1.jpg',
          'https://example.com/iphone15pro-2.jpg'
        ],
        tags: ['smartphone', 'apple', '5g', 'camera']
      }
    }),
    prisma.product.create({
      data: {
        name: 'MacBook Air M2',
        description: 'Ultra-thin laptop with M2 chip for ultimate performance',
        price: 1199.99,
        sku: 'MACBOOK-AIR-M2-001',
        categoryId: electronics.id,
        stock: 25,
        isActive: true,
        images: [
          'https://example.com/macbook-air-1.jpg',
          'https://example.com/macbook-air-2.jpg'
        ],
        tags: ['laptop', 'apple', 'm2', 'ultrabook']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Samsung Galaxy S24',
        description: 'Android flagship with AI features and stunning display',
        price: 899.99,
        sku: 'SAMSUNG-S24-001',
        categoryId: electronics.id,
        stock: 40,
        isActive: true,
        images: [
          'https://example.com/samsung-s24-1.jpg',
          'https://example.com/samsung-s24-2.jpg'
        ],
        tags: ['smartphone', 'samsung', 'android', 'ai']
      }
    }),

    // Clothing
    prisma.product.create({
      data: {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Air Max technology',
        price: 129.99,
        sku: 'NIKE-AIRMAX-270-001',
        categoryId: clothing.id,
        stock: 100,
        isActive: true,
        images: [
          'https://example.com/nike-airmax-1.jpg',
          'https://example.com/nike-airmax-2.jpg'
        ],
        tags: ['shoes', 'nike', 'running', 'comfortable']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Levi\'s 501 Jeans',
        description: 'Classic straight fit jeans for everyday wear',
        price: 89.99,
        sku: 'LEVIS-501-001',
        categoryId: clothing.id,
        stock: 75,
        isActive: true,
        images: [
          'https://example.com/levis-501-1.jpg',
          'https://example.com/levis-501-2.jpg'
        ],
        tags: ['jeans', 'levis', 'classic', 'denim']
      }
    }),

    // Books
    prisma.product.create({
      data: {
        name: 'The Pragmatic Programmer',
        description: 'Your journey to mastery in software development',
        price: 49.99,
        sku: 'BOOK-PRAGMATIC-001',
        categoryId: books.id,
        stock: 30,
        isActive: true,
        images: [
          'https://example.com/pragmatic-programmer-1.jpg'
        ],
        tags: ['programming', 'software', 'development', 'career']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Clean Code',
        description: 'A handbook of agile software craftsmanship',
        price: 39.99,
        sku: 'BOOK-CLEAN-CODE-001',
        categoryId: books.id,
        stock: 45,
        isActive: true,
        images: [
          'https://example.com/clean-code-1.jpg'
        ],
        tags: ['programming', 'clean-code', 'software', 'best-practices']
      }
    }),

    // Home & Garden
    prisma.product.create({
      data: {
        name: 'Philips Hue Smart Bulb',
        description: 'Smart LED bulb with 16 million colors and voice control',
        price: 59.99,
        sku: 'PHILIPS-HUE-001',
        categoryId: homeGarden.id,
        stock: 60,
        isActive: true,
        images: [
          'https://example.com/philips-hue-1.jpg',
          'https://example.com/philips-hue-2.jpg'
        ],
        tags: ['smart-home', 'lighting', 'philips', 'voice-control']
      }
    }),

    // Sports
    prisma.product.create({
      data: {
        name: 'Wilson Tennis Racket',
        description: 'Professional tennis racket for advanced players',
        price: 199.99,
        sku: 'WILSON-TENNIS-001',
        categoryId: sports.id,
        stock: 20,
        isActive: true,
        images: [
          'https://example.com/wilson-tennis-1.jpg',
          'https://example.com/wilson-tennis-2.jpg'
        ],
        tags: ['tennis', 'wilson', 'sports', 'professional']
      }
    }),
    prisma.product.create({
      data: {
        name: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat for home and studio practice',
        price: 34.99,
        sku: 'YOGA-MAT-001',
        categoryId: sports.id,
        stock: 80,
        isActive: true,
        images: [
          'https://example.com/yoga-mat-1.jpg'
        ],
        tags: ['yoga', 'fitness', 'mat', 'non-slip']
      }
    })
  ]);

  console.log('✅ Created products:', products.map(p => p.name));

  console.log('🎉 Seeding completed successfully!');
  console.log(`📊 Created ${5} categories and ${products.length} products`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });