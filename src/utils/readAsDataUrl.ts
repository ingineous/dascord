async function readFileAsDataURL(file: File) {
  const result_base64: string = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.readAsDataURL(file);
  });

  return result_base64;
}

async function readFileAsText(file: File) {
  const result_base64: string = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.readAsText(file);
  });

  return result_base64;
}

export { readFileAsText };
export default readFileAsDataURL;
