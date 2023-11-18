import React, { PropTypes } from 'react';
import Select from 'react-select';

const options = [
  { imgName: '_empty', value: '/static/logo/_empty.svg', label: 'Select team' },
  { imgName: 'dynamo', value: '/static/logo/Dynamo.png', label: 'Draisma Dynamo', home: '#ffff00', away: '#00ff00' },
  { imgName: 'huizen', value: '/static/logo/heren/Huizen.png', label: 'Prima Donna Kaas Huizen', home: '#ffff00', away: '#00ff00' },
  { imgName: 'limax', value: '/static/logo/heren/Limax.png', label: 'Numidia VC Limax', home: '#ffff00', away: '#00ff00' },
  { imgName: 'lycurgus', value: '/static/logo/heren/Lycurgus.png', label: 'Nova Tech Lycurgus', home: '#ffff00', away: '#00ff00' },
  { imgName: 'orion', value: '/static/logo/heren/Orion.png', label: 'Active Living Orion', home: '#ffff00', away: '#00ff00' },
  { imgName: 'sliedrecht', value: '/static/logo/Sliedrecht.png', label: 'Sliedrecht Sport', home: '#ffff00', away: '#00ff00' },
  { imgName: 'sss', value: '/static/logo/heren/SSS.png', label: 'Simplex/SSS', home: '#ffff00', away: '#00ff00' },
  { imgName: 'ttpa', value: '/static/logo/heren/TTPA.png', label: 'TalentTeam Papendal', home: '#ffff00', away: '#00ff00' },
  { imgName: 'vocasa', value: '/static/logo/heren/Vocasa.png', label: 'VoCASA', home: '#ffff00', away: '#00ff00' },
  { imgName: 'zvh', value: '/static/logo/heren/ZVH.png', label: 'SCHERP IN PACKAGING ZVH', home: '#ffff00', away: '#00ff00' },
  { imgName: 'activia', value: '/static/logo/dames/Activia.png', label: 'SOMAS/Activia', home: '#', away: '#' },
  { imgName: 'apollo-8', value: '/static/logo/dames/Apollo 8.png', label: 'Apollo 8', home: '#', away: '#' },
  { imgName: 'peelpush', value: '/static/logo/dames/Peelpush.png', label: 'Peelpush', home: '#', away: '#' },
  { imgName: 'sneek', value: '/static/logo/dames/Sneek.png', label: 'Friso Sneek', home: '#', away: '#' },
  { imgName: 'sudosa-desto', value: '/static/logo/dames/Sudosa-Desto.png', label: 'Visser Assen/Sudosa-Desto', home: '#', away: '#' },
  { imgName: 'utrecht', value: '/static/logo/dames/Utrecht.png', label: 'De Hollandse Pot Enzo VV Utrecht', home: '#', away: '#' },
  { imgName: 'voltena', value: '/static/logo/dames/Voltena.png', label: 'Voltena', home: '#', away: '#' },
  { imgName: 'zwolle', value: '/static/logo/dames/Zwolle.png', label: 'Djopzz Zwolle Topvolleybal', home: '#', away: '#' },
];

function renderOption(option) {
  return (
    <div className="select-logo-option">
      <img className="select-logo-image" src={option.value} alt="Team Logo" />
      <span>{option.label}</span>
    </div>
  );
}

function LogoSelect(props) {
  return (
    <Select
      name="select-logo"
      placeholder="Select a logo"
      value={props.selected}
      options={options}
      clearable={false}
      searchable={false}
      onChange={props.onChange}
      optionRenderer={renderOption}
      valueRenderer={renderOption}
    />
  );
}

LogoSelect.propTypes = {
  onChange: PropTypes.func,
  selected: PropTypes.string,
};

export default LogoSelect;
