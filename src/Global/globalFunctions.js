export const formatDate = (date) => {
  return Intl.DateTimeFormat("he-IL").format(new Date(date));
};

export const formatTime = (date) => {
  const dateObj = new Date(date);

  const hours = String(dateObj.getHours());
  const minutes = String(dateObj.getMinutes());

  const formatHours = (hours.length == 1 ? "0" : "") + hours;
  const formatMinutes = (minutes.length == 1 ? "0" : "") + minutes;

  return formatHours + ":" + formatMinutes;
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
