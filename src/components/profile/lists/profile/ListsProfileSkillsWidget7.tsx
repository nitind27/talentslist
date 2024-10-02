import React from 'react';
import { ListsSkillsProps } from './Profilepageprops';



const ListsProfileSkillsWidget7: React.FC<ListsSkillsProps> = ({ skills }) => {
  return (
    <div>
      <div className={`card`}>
        <div className="card-header border-0">
          <h3 className="card-title text-gray-900">
            <i className="ki-solid ki-star me-2"></i> Skills
          </h3>
          
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
            >
              <i className="ki-solid ki-notepad-edit fs-3 text-primary"></i> {/* Updated icon size and color */}
            </button>
          </div>
         
        </div>
        <div className='separator mb-4'></div>
        <div className="ms-sm-10 m-2">
          <span className="fw-bold">SKILLS</span>
          <p className="ms-5 text-gray">{skills}</p>
        </div>
      </div>
    </div>
  );
};

export default ListsProfileSkillsWidget7;
