import { FilterQuery } from 'mongoose';

type FindOptions = {
  model: any;
  filter?: any;
  populate?: any;
  select?: string;
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1 | 'asc' | 'desc'>;
  lean?: boolean;
};

const findDoc = async ({
  model,
  filter = {},
  populate,
  select,
  page = 1,
  limit = 10,
  sort,
  lean = false,
}: FindOptions) => {
  try {
    // Create base query
    let query: any = model.find(filter);

    // Apply query modifiers
    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    if (sort) query = query.sort(sort);
    if (lean) query = query.lean();

    // Apply pagination
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Execute parallel queries for results and count
    const [results, total] = await Promise.all([
      query.exec(),
      model.countDocuments(filter),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
      results,
    };
  } catch (error) {
    console.error('Error in findDoc :', error);
    throw new Error('Failed to fetch documents');
  }
};

export default findDoc;
