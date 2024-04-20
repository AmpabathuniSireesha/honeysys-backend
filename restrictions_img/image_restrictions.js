const maxImageSize={
    'image/jpeg':5*1024,
    'image/png':5*1024,
    'image/gif':200*1024,
    'image/tiff':400*1024,
    'image/vnd.adobe.photoshop':600*1024,
    'application/pdf':800*1024,
    'application/postscript':700*1024,
    'application/illustrator':900*1024
};

const checkImageType=(fileType,fileSize)=>{
    if(!(fileType in maxImageSize)){
        throw new Error("Unsupported Image Type");
    }
    const maxSizeBytes=maxImageSize[fileType];
    if(fileSize>maxImageSize){
        throw new Error(`Image size for ${fileType} exceeds limit`);
    }
};

module.exports={checkImageType};

// 
// 
// 