import {createContext, useState} from 'react';

export const IpContext = createContext();

export const IpProvider = props => {
  const [ip, setIp] = useState();
  return (
    <IpContext.Provider value={[ip, setIp]}>
      {props.children}
    </IpContext.Provider>
  );
};

const IpExport = {IpContext, IpProvider};

export default IpExport;
