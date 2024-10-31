async function readFileAsDataURL(file: File) {
  const result_base64: string = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.readAsDataURL(file);
  });

  console.log(result_base64); // aGV5IHRoZXJl...

  return result_base64;
}

export default readFileAsDataURL;
