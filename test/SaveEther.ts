import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("Save Ether", function () {

  async function deploySaveEther() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const DepositAmount = ethers.parseEther("1");



    const SaveEther = await ethers.getContractFactory("SaveEther");
    const saveEther = await SaveEther.deploy();
    return { saveEther, DepositAmount, owner, otherAccount };

  }


  describe("checking address zero test functions instance", async () => {

    it("it should not be address 0", async () => {
      const { owner } = await loadFixture(deploySaveEther);
      expect(owner).not.equal(0x00000000000000000000000000000000000000000000000000);

    })

  });

  describe("Deposit test", async () => {
    // const {saveEther,owner} = await loadFixture(deploySaveEther);

    it("check desposit to greater than zero", async () => {
      const { saveEther } = await loadFixture(deploySaveEther);

      const hasDeposited = await saveEther.deposit({ value: 2 });
      expect(hasDeposited.value).eq(2);

    })

    it("check savings increase", async () => {
      const { saveEther, owner } = await loadFixture(deploySaveEther);

      await saveEther.deposit({ value: 2 });

      const checkBal = await saveEther.checkSavings(owner);

      expect(checkBal).to.eq(2);

    })

    it("it should emit event", async () => {
      const { saveEther, owner } = await loadFixture(deploySaveEther);

      await expect(saveEther.deposit({ value: 7 }))
        .to.emit(saveEther, 'SavingSuccessful')
        .withArgs(
          owner,
          7
        );

    })


  describe("Withdraw", function () {
    it("Check withdraw", async function () {
      const { saveEther, owner } = await loadFixture(deploySaveEther);
      await saveEther.deposit({ value: 2 });
      await saveEther.withdraw();
      const checkSavings = await saveEther.checkSavings(owner);
      expect(checkSavings).eq(0)

    });


  });



  describe("send saving", function () {
    it("Check successful transfer", async function () {
      const { saveEther, owner } = await loadFixture(deploySaveEther);
      const checkAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
      await saveEther.deposit({ value: 3 });
      await saveEther.sendOutSaving(checkAddress, 2);
      const checkSavings = await saveEther.checkSavings(owner);
      expect(checkSavings).eq(2)

    });

  })

});
})

