interface UpdateDocProps {
  model: any;
  filter: any;
  populate?: any;
  select?: string;
  payload?: any;
}

const updateDoc = async ({
  model,
  filter,
  payload,
  populate,
  select,
}: UpdateDocProps) => {
  try {
    let query: any = model.findOneAndUpdate(filter, payload, { new: true });

    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);

    const results = await query.exec();

    return results;
  } catch (error) {
    console.log('Error in updateDoc: ', error);

    throw new Error('Failed to update document');
  }
};

export default updateDoc;
