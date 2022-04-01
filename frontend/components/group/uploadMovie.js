import React, {useCallback, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function StyledDropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles: ', acceptedFiles)
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({ onDrop });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const files = useMemo(() => 
  acceptedFiles.map((file) => (
      <li key={file.path}>
          {file.path} - {file.size} bytes
      </li>
  )
), [acceptedFiles]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>動画をドラッグするか、ここをクリックして動画をアップロードしてください。</p>
      </div>
      <aside className="mt-1">
        <h4 className="mb-0">アップロードファイル</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}
