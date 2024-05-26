import randomstring from 'randomstring';

const GenerateID = async () => {
    const num = randomstring
      .generate({
        length: 12,
        charset: "alphanumeric",
        capitalization: "uppercase",
      })
      .toString();
    return num;
};

export { GenerateID };