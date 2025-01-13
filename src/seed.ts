import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function seed() {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();

    await db.collection('campaigns').deleteMany({});

    const campaigns = [
      {
        title: 'Football talent campaign Campaign',
        description: 'Showcase our new football talents',
        deadline: new Date('2025-02-01'),
        status: 'ACTIVE',
        requirements: [
          'Post must include #Football tournament Campaign',
          'Show at least 15 good players',
          'Tag @brandname in post'
        ],
        metrics: {
          totalSubmissions: 0,
          averageEngagement: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Summer Fashion Campaign',
        description: 'Showcase our new summer collection',
        deadline: new Date('2025-06-01'),
        status: 'ACTIVE',
        requirements: [
          'Post must include #SummerFashion',
          'Show at least 2 items from collection',
          'Tag @brandname in post'
        ],
        metrics: {
          totalSubmissions: 0,
          averageEngagement: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Food Review Challenge',
        description: 'Review our new menu items',
        deadline: new Date('2025-05-01'),
        status: 'ACTIVE',
        requirements: [
          'Visit restaurant during business hours',
          'Show food presentation',
          'Give honest review'
        ],
        metrics: {
          totalSubmissions: 0,
          averageEngagement: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const result = await db.collection('campaigns').insertMany(campaigns);
    console.log('Campaigns seeded successfully:', result.insertedIds);

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
