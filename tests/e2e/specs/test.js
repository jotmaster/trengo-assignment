// https://docs.cypress.io/api/introduction/api.html

describe('Channels PopUp Tests', () => {
	it('PopUp should open', () => {
		cy.visit('/');
		cy.get('.sidebar > [data-title="channels"]').find('[data-action="popup"]').click();
		cy.get('.channel-manager');
	});
	it('New channel should be able to be added', () => {
		cy.get('.channel-item[data-title="testing"]').should('not.exist');
		cy.get('.channel-input').type('Testing').trigger('keyup', { key: 'Enter' });
		cy.get('.channel-item[data-title="testing"]').should('exist');
	});
	it('Channel search should work', () => {
		cy.get('.channel-input').type('Not a real one');
		cy.get('.channel-item[data-title="testing"]').should('not.be.visible');
		cy.get('.channel-input').clear();
		cy.get('.channel-input').type('Test');
		cy.get('.channel-item[data-title="testing"]').should('be.visible');
		cy.get('.channel-input').clear();
	});
	it('Channel should be able to be removed', () => {
		cy.get('.channel-item[data-title="testing"]').should('exist');
		cy
			.get('.channel-item[data-title="testing"]')
			.find('button.remove-channel')
			.click();
		cy.get('.channel-item[data-title="testing"]').should('not.exist');
	});
	it(`Channel Cancel and Apply buttons shouldn't be visible`, () => {
		cy.get('button[data-action="cancel"]').should('be.hidden');
		cy.get('button[data-action="apply"]').should('be.hidden');
	});
	it(`Channel Cancel and Apply buttons should be visible`, () => {
		cy.get('.channel-input').type('Testing').trigger('keyup', { key: 'Enter' });
		cy.get('button[data-action="cancel"]').should('be.visible');
		cy.get('button[data-action="apply"]').should('be.visible');
	});
	it('Channel should be draggable', () => {
		cy.get('.channel-item').last().should('have.attr', 'data-title', 'testing');
		cy.get('.channel-item').last().find('.channel-dragger').then(el => el[0].getBoundingClientRect()).as('rect');
		cy.get('@rect').then(rect => cy.get('.channel-item').last()
			.trigger('dragstart', {
				dataTransfer: {},
				clientX: rect.x,
				clientY: rect.y,
			})
			.trigger('dragleave'));
		cy.get('.channel-item').first()
			.trigger('dragenter')
			.trigger('dragover', {
				dataTransfer: {},
				offsetY: 0,
			})
			.trigger('drop')
			.trigger('dragend');
		cy.get('.channel-item').first().should('have.attr', 'data-title', 'testing');
	});
	it('Channel Cancel should not apply changes', () => {
		cy.get('button[data-action="cancel"]').click();
		cy.get('.sidebar > [data-title="channels"]').find('.category-child[data-title="testing"]').should('not.exist');
	});
	it('Channel Apply should apply changes', () => {
		cy.get('.sidebar > [data-title="channels"]').find('.category-child[data-title="testing"]').should('not.exist');
		cy.get('.sidebar > [data-title="channels"]').find('[data-action="popup"]').click();
		cy.get('.channel-manager');
		cy.get('.channel-input').type('Testing').trigger('keyup', { key: 'Enter' });
		cy.get('.channel-item[data-title="testing"]').should('exist');
		cy.get('button[data-action="apply"]').click();
		cy.get('.sidebar > [data-title="channels"]').find('.category-child[data-title="testing"]').should('exist');
	});
});
