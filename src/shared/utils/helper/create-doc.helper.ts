interface CreateDocProps {
  payload: any;
  model: any;
}
const createDoc = async ({ payload, model }: CreateDocProps) => {
  try {
    const results = await model.create(payload);
    return results;
  } catch (error) {
    console.error('Error in createDoc:', error);
    throw new Error('Failed to create document');
  }
};

export default createDoc;
