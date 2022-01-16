import { useState } from 'react';

// App
import { UserInterface } from '../src/apps/user-interface';
import { EditionModal } from '../src/apps/edition-modal';

// UI Components
import { Card, StyledP } from '../src/components/ui';
import { useNoUno } from '../src/context/nouno';

const Home = () => {
  const { status } = useNoUno();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
      setIsOpen(true);
    }
  
  function closeModal() {
      setIsOpen(false);
  }

  if (status != "Connected") return (
    <StyledP
      family="neuropol-x-light, sans-serif"
      size="50px"
    >
      Please connect your wallet.
    </StyledP>
  )


  return (
    <Card
      width="100%"
      height="100%"
    >
      <EditionModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
      <UserInterface 
        openModal={openModal}
        type="Account"
      />
    </Card>
  )
}

export default Home
