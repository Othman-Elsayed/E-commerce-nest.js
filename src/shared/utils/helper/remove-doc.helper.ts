interface RemoveDocProps {
  model: any;
  filter: any;
  populate?: any;
  select?: string;
  payload?: any;
}

const removeDoc = async ({
  model,
  filter,
  populate,
  select,
}: RemoveDocProps) => {
  try {
    let query: any = model.findOneAndDelete(filter);

    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);

    const results = await query.exec();

    return results;
  } catch (error) {
    console.log('Error in removeDoc: ', error);

    throw new Error('Failed to remove document');
  }
};

export default removeDoc;
