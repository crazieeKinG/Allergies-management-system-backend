interface ResponseData<T> {
    data: T | T[];
    message: string;
}

export default ResponseData;
