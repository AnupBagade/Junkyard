import React from 'react';

const CoreData = {
    userData: {},
    endPointsConfigs: {},
    updateUserData: () => {},
}

const CoreProviderContext = React.createContext(CoreData);

export default CoreProviderContext;
