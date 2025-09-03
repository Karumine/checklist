import React from 'react';

// กำหนด Interface สำหรับ props ของคอมโพเนนต์
interface SelectMachineryProps {
    onSelectMachinery: (machineryType: string) => void;
}

const SelectMachinery: React.FC<SelectMachineryProps> = ({ onSelectMachinery }) => {
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Select Type of Machinery</h2>
            <div className="row g-3">
                <div className="col-md-4">
                    <div
                        className="card shadow-sm h-100 p-3"
                        style={{ cursor: 'pointer', transition: 'transform 0.2s', backgroundColor: '#f8f9fa' }}
                        onClick={() => onSelectMachinery('เครื่องเป่าขวด')}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold text-primary">เครื่องเป่าขวด</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="card shadow-sm h-100 p-3"
                        style={{ cursor: 'pointer', transition: 'transform 0.2s', backgroundColor: '#f8f9fa' }}
                        onClick={() => onSelectMachinery('เครื่องจักรประเภท B')}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold text-primary">เครื่องจักรประเภท B</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="card shadow-sm h-100 p-3"
                        style={{ cursor: 'pointer', transition: 'transform 0.2s', backgroundColor: '#f8f9fa' }}
                        onClick={() => onSelectMachinery('เครื่องจักรประเภท C')}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title fw-bold text-primary">เครื่องจักรประเภท C</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectMachinery;
