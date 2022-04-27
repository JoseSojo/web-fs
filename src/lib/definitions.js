let def = {};

def.speciality = (heal,at,def,vel,mana)=>{
  if(
    heal >= at && heal >= def && heal >= vel && heal > mana
  ) return {stat: 'Healt', value: heal};

  if(
    at >= heal && at >= def && at >= vel && at > mana
  ) return {stat: 'Attack', value: at};

  if(
    def >= at && def >= heal && def >= vel && def > mana
  ) return {stat: 'Defense', value: def};

  if(
    vel >= at && vel >= def && vel >= heal && vel > mana
  ) return {stat: 'Velocity', value: vel};

  if(
    mana >= at && mana >= def && mana >= vel && mana > heal
  ) return {stat: 'Mana', value: mana};
}

module.exports = def;
