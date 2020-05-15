import axios from 'axios';
import { Host } from '../../utils/connection';

const SAVE = 'SAVE_PATIENT_INFO'
const ERRORS = 'HAVEING_ERROR_IN_PATIENT_ACCOUNT_REDUCER'
const LOADING = 'START_PATIENT_ACCOUNT_LOADING'
const RESET = 'RESET_PATIENT_ACCOUNT_REDUCER'
const SAVE_FEV_DOC = 'SAVE_PATIENT_FEV_DOC';
const SAVE_FAMILY_MEMBER = 'SAVE_PATIENT_FAMILY_MEMBER'

const saveUserAccount = (data) => {
    return {
        type: SAVE,
        payload: data
    }
}

const saveFevDoc = (data) => {
    return {
        type: SAVE_FEV_DOC,
        payload: data
    }
}

const saveFamilyMember = (data) => {
    return {
        type: SAVE_FAMILY_MEMBER,
        payload: data
    }
}

const startLoading = () => {
    return {
        type: LOADING
    }
}


const havingError = (err) => {
    return {
        type: ERRORS,
        payload: err
    }
}

export const resetUserAccountReducer = () => {
    return {
        type: RESET
    }
}

export const GetPatientInfo = (id) => {
    return async dispatch => {
        console.log('authAction > GetPatientInfor');
        dispatch(startLoading())

        await axios
            .get(`${Host}/patient/getinfo/${id}`)
            .then((result) => {
                if (result.status) {
                    // console.log(result.data.data);
                    dispatch(saveUserAccount(result.data.data))
                }

            })
            .catch((err) => {
                dispatch(havingError(err))
            });
    }
}

export const GetFevDoc = (docId) => {
    return async dispatch => {

        const preAdd = {
            specialty: 788,
            city: 'New York',
            _id: docId
        }

        await axios.post(`${Host}/doctors/search`, preAdd)
            .then(res => {
                console.log('************** patientAccotioon **********')
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }
}

export const AddFevDoc = (docId, patientId) => {
    return async dispatch => {
        const config = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const _data = {
            id: patientId,
            docId: docId
        };

        await axios
            .post(`${Host}/patient/favourite/add`, _data, config)
            .then((result) => {
                if (result.status) {
                    console.log('Successfully Add your fev doctor.')
                    GetPatientInfo(patientId);
                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }
}

export const RemoveFevDoc = (docId, patientId) => {
    return async dispatch => {
        const config = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const _data = {
            id: patientId,
            docId: docId
        };

        await axios
            .post(`${Host}/patient/favourite/remove`, _data, config)
            .then((result) => {
                if (result.status) {
                    console.log('Successfully remove fev doctor.')
                    GetPatientInfo(patientId);
                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }
}



export const GetFamilyMember = (id) => {
    return dispatch => {

        dispatch(startLoading())
        console.log(id)

        const config = {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const _data = {
            metaId: "5eb31e07e078c64910b9d29e", 
        }

        axios.post(`${Host}/patient/member/get`, _data, config)
            .then(res => {
                console.log(res.data.data.members)
                dispatch(saveFamilyMember(res.data.data.members))
            })
            .catch(err => {
                console.log(err)
            })

    }
}

export const AddFamilyMember = (obj, success, faild) => {
    return async dispatch => {
        dispatch(startLoading())
        const config = {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        obj.metaId = '5eb31e07e078c64910b9d29e'

        await axios
            .post(`${Host}/patient/member/add`, obj, config)
            .then((result) => {
                if (result.status) {
                    console.log('Successfully Add your Family member.')
                    success()
                    GetFamilyMember()

                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }
}

export const RemoveFamilyMember = (docId, patientId) => {
    return async dispatch => {
        const config = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const _data = {
            id: patientId,
            docId: docId
        };

        await axios
            .post(`${Host}/patient/favourite/remove`, _data, config)
            .then((result) => {
                if (result.status) {
                    console.log('Successfully remove fev doctor.')
                    GetPatientInfo(patientId);
                }
            })
            .catch((err) => {
                dispatch(haveingError(err))
            });
    }
}