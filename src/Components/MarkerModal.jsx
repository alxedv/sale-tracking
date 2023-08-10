import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "react-bootstrap";

export default function MarkerModal({
  isOpen,
  toggle = () => null,
  remove,
  coord,
}) {
  return (
    <div>
      <Modal show={isOpen} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
        >{`${coord.city} - ${coord.uf}`}</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column">
            <span>Orçamento: 123123</span>
            <span>Projeto: Abcde</span>
            <span>Valor médio: 123123123</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              remove(coord.lat, coord.lng);
              toggle();
            }}
            variant="outline-danger"
          >
            Remover
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
