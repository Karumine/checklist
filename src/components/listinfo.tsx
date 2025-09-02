// src/components/ListInfo.tsx

import React from 'react';

// กำหนด Interface เพื่อระบุชนิดข้อมูลของ Props ที่คอมโพเนนต์จะได้รับ
interface ListInfoProps {
  systemName: string;
  machineNo: string;
  machineType: string;
  brand: string;
  date: string;
  handoverType: string;
  poNumber: string;
  projectName: string;
  location: string;
  province: string;
  contactPerson: string;
  contactRole: string;
  mobile: string;
}

const ListInfo: React.FC<ListInfoProps> = ({
  systemName,
  machineNo,
  machineType,
  brand,
  date,
  handoverType,
  poNumber,
  projectName,
  location,
  province,
  contactPerson,
  contactRole,
  mobile,
}) => {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 p-3">
        <div className="card-body">
          {/* Header Section */}
          <div className="row mb-3 align-items-center border-bottom pb-2">
            <div className="col-md-6">
              <h4 className="fw-bold text-primary mb-0 text-start">{systemName}</h4>
            </div>
            <div className="col-md-6 text-md-end">
              <h4 className="fw-bold text-muted mb-0">No. {machineNo} {machineType}</h4>
            </div>
          </div>

          {/* Row 1: Brand, Date, Handover, PO.No (4 columns) */}
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Brand:</strong> {brand}
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Date:</strong> {date}
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Handover:</strong> {handoverType}
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>PO.No:</strong> {poNumber}
              </div>
            </div>
          </div>
          
          {/* Row 2: Project, Location, Province (3 columns + 1 empty) */}
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Project:</strong> {projectName}
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Location:</strong> {location}
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Province:</strong> {province}
              </div>
            </div>
            <div className="col-md-3">
              {/* คอลัมน์ว่างเพื่อให้ครบ 4 คอลัมน์ */}
            </div>
          </div>
          
          {/* Row 3: Contact, Mobile (2 columns + 2 empty) */}
          <div className="row g-2">
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Contact Pers:</strong> {contactPerson} {contactRole}
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-box p-2 bg-light rounded text-start">
                <strong>Mobile:</strong> <a href={`tel:${mobile}`} className="text-success text-decoration-none">{mobile}</a>
              </div>
            </div>
            <div className="col-md-3">
              {/* คอลัมน์ว่างเพื่อให้ครบ 4 คอลัมน์ */}
            </div>
            <div className="col-md-3">
              {/* คอลัมน์ว่างเพื่อให้ครบ 4 คอลัมน์ */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListInfo;