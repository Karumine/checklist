import React from 'react';

// กำหนด Interface สำหรับ Props
interface Machinery {
    brand: string;
    poNumber: string;
    contactRole: string;
    systemName: string;
    projectName: string;
    date: string;
    location: string;
    province: string;
    contactPerson: string;
    mobile: string;
    machineNo: string;
    machineType: string;
    handoverType: string;
    system: string;
}

interface MachineryListProps {
    list: Machinery[];
    selectedMachineryType: string;
    onSelectMachinery: (machinery: Machinery) => void;
    onBack: () => void;
}

const MachineryList: React.FC<MachineryListProps> = ({ list, selectedMachineryType, onSelectMachinery, onBack }) => {
    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={onBack}>
                ย้อนกลับ
            </button>
            <h2 className="text-center mb-4">เลือกเครื่องจักร: {selectedMachineryType}</h2>
            <div className="row g-3">
                {list.map((machinery, index) => (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <div
                            className="card shadow-sm h-100 p-3"
                            style={{ cursor: 'pointer', transition: 'transform 0.2s', backgroundColor: '#f8f9fa' }}
                            onClick={() => onSelectMachinery(machinery)}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <div className="d-flex align-items-center mb-3">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                    <i className="bi bi-gear-fill"></i>
                                </div>
                                <div>
                                    <h5 className="card-title fw-bold mb-0 text-primary">{machinery.system}</h5>
                                </div>
                            </div>
                            <p className="card-text text-muted mb-1">
                                <strong>หมายเลขเครื่อง:</strong> {machinery.machineNo}
                            </p>
                            <p className="card-text text-muted mb-1">
                                <strong>ยี่ห้อ:</strong> {machinery.brand}
                            </p>
                            <p className="card-text text-muted mb-0">
                                <strong>โปรเจกต์:</strong> {machinery.projectName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MachineryList;
