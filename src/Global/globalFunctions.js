export const formatTime = (date) => {
  return Intl.DateTimeFormat("he-IL").format(new Date(date));
};

export const uploadImage = async (event, resultFunction, onError) => {
  try {
    const file = event.target.files[0];

    let reader = new FileReader();

    reader.onload = () => {
      // setInputData({ ...inputData, image: reader.result });
      resultFunction(reader.result);
    };

    reader.readAsDataURL(file);
  } catch (error) {
    // resultFunction({ ...inputData, image: null });
    resultFunction(null);
    onError();
    
  }
};
