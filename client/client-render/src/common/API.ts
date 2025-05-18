// import currentPort from "../../../../port_config/serverPort"
export const baseURL: string = `http://localhost:${import.meta.env.PORT || 3000}`;

const SummaryApi = {
    createFolder: {
        url: `api/createFolder`,
        method: `post`,
    },
    getFolder: {
        url: `api/StorageFolder`,
        method: `get`,
    },
    getFile: {
        url: `api/listFile`,
        method: `post`,
    },
    imagePreview: {
        url: `/imagehost`,
        method: `get`,
    },
};

export default SummaryApi;