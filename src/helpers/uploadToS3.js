import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";


const uploadToS3 = async (video) => {
    try {
        const parallelUploads3 = new Upload({
            client: new S3Client({
                region: 'us-east-1',
                credentials: {
                    secretAccessKey: 'AKIARHZ4HY4NI4BFBNNH',
                    accessKeyId: 'ChRKLMr7SLyFy3kn8CBjFyrAhqS0Sc68NINfHJic'
                },

            }),
            params: { Bucket: "edufy-records", Key: "khaled-16102031", Body: video },
            leavePartsOnError: false, // optional manually handle dropped parts
        });

        parallelUploads3.on("httpUploadProgress", (progress) => {
            console.log(progress);
        });

        await parallelUploads3.done();
    } catch (e) {
        console.log(e);
    }
}

export default uploadToS3;