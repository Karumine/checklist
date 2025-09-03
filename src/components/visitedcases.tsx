import React from 'react';

// กำหนด Interface สำหรับ Props
interface VisitedCase {
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

interface VisitedCasesProps {
    visitedCases: VisitedCase[];
    onSelectCase: (caseData: VisitedCase) => void;
    onBack: () => void;
}

const VisitedCases: React.FC<VisitedCasesProps> = ({ visitedCases, onSelectCase, onBack }) => {
    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={onBack}>
                ย้อนกลับ
            </button>
            <h2 className="text-center mb-4">เลือกเคสที่เคยเยี่ยมชม</h2>
            <div className="row g-3">
                {visitedCases.map((caseData, index) => (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                        <div
                            className="card shadow-sm h-100 p-3"
                            style={{ cursor: 'pointer', transition: 'transform 0.2s', backgroundColor: '#f8f9fa' }}
                            onClick={() => onSelectCase(caseData)}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <div className="d-flex align-items-center mb-3">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                    <i className="bi bi-folder-fill"></i>
                                </div>
                                <h5 className="card-title fw-bold mb-0 text-primary">{caseData.projectName}</h5>
                            </div>
                            <p className="card-text text-muted mb-1">
                                <strong>วันที่:</strong> {caseData.date}
                            </p>
                            <p className="card-text text-muted mb-1">
                                <strong>หมายเลขเครื่อง:</strong> {caseData.machineNo}
                            </p>
                            <p className="card-text text-muted mb-0">
                                <strong>สถานที่:</strong> {caseData.location}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VisitedCases;
