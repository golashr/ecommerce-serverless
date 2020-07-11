import 'source-map-support/register';

export const main = async (): Promise<any> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless v1.0! ${await message({
        time: 1,
        copy: 'Your function executed successfully!',
      })}`,
    }),
  };
};

const message = (rest: IRest) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(`${rest.copy} (with a delay)`);
    }, rest.time * 1000),
  );

declare type IRest = {
  time: number;
  copy: string;
};
